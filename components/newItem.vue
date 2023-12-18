<template>
    <v-card>
        <v-card-item>
            <v-text-field
                v-model="newItem.name"
                label="new name"
            />
            <v-text-field
                v-model="newItem.price"
                label="new price"
            />
            <v-text-field
                v-model="newItem.description"
                label="new description (optional)"
            />
        </v-card-item>
        <v-card-item>
            Add Section: {{ newItem.section.name }} <br/>
            <template
                v-for="(section,i) in sections"
                :key="i"
            >
                <v-chip @click="addSection(section)">
                    {{ section.name }}
                </v-chip>
            </template>
        </v-card-item>
        <v-card-item>
            Add Options for Item: <br/>
            <template v-if="newItem.options.length">
                <v-chip
                    v-for="(option,j) in newItem.options"
                    :key="j"
                >

                    {{ option.name }}
                    <v-icon icon="mdi-close" @click="newItem.options.splice(j,1)"/>
                </v-chip>
            </template>
            <br/><v-divider/>
            <v-chip
                v-for="(section,i) in sections"
                :key="i"
                @click="addOption(section)"
            >
                {{ section.name }}
            </v-chip>
        </v-card-item>
        <v-card-actions>
            <v-btn @click="submitItem()">submit</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default{
    props:{
        sections: {
            type: Array,
            required: true
        },
        items:{
            type: Array,
            required: true
        },
    },
    data(){
        return{
            newItem:{
                name: '',
                price: 0,
                section_id: '',
                description: '',
                options: [],
                section:{},
            }
        }
    },
    methods:{
        addSection(section){
            const sectionHolder={
                name: section.name ? section.name : '',
                _id: section._id ? section._id : '',
                choice: section.choice ? section.choice : 0,
                suggested: section.suggested.length ? section.suggested:[],
                ingr: section.ingr.length ? section.ingr : [],
            }
            this.newItem.section_id=sectionHolder._id;
            this.newItem.section=sectionHolder;
        },
        addOption(section){
            const sectionHolder={...section};
            this.newItem.options.push(sectionHolder)
        },
        async submitItem(){
            console.log('submit item ', this.newItem)
            const holder = {
                name: this.newItem.name ? this.newItem.name : '',
                price: this.newItem.price ? this.newItem.price : 0,
                options: this.newItem.options.length ? this.newItem.options : [],
                section: {
                    name: this.newItem.section.name,
                    _id: this.newItem.section_id
                },
                description: this.newItem.description ? this.newItem.description : '',
            }
            console.log(holder)
            //holder.price = Number(holder.price)
            const {data, err } = await useFetch('/api/items', {
                method: 'POST',
                body: JSON.stringify(holder)
            })
            console.log('item3',data.value.res)
            const section = this.sections.find(sec => sec._id === data.value.res.section._id)
            if(section){
                console.log('section')
                console.log(section);
                section.ingr.push(holder)
                const {data, err } = await useFetch('/api/sections/'+section._id, {
                    method: 'PUT',
                    body: JSON.stringify(section)
                })
            }
            console.log('section3',data.value.res)
            console.log(this.items.length)
            for(let i=0;i< this.items.length;i++){
                if(this.items[i].options.length){
                    for(let j=0;this.items[i].options.length;j++){
                        if(this.items[i].options[j]._id === section._id){
                            console.log('ffff',this.items[i])
                            this.items[i].options[j].ingr.push(holder)
                            console.log('updated item',this.items[i])
                            const {data, err } = await useFetch('/api/items/'+this.items[i]._id, {
                                method: 'PUT',
                                body: JSON.stringify(this.items[i])
                            })
                            console.log(data.value.res)
                        }
                    }
                }
            }
            this.$router.push({path:'/editMenu/',})
        },
    }
}
</script>