<template>
  <div id="section-component">
    <v-toolbar id="bar">
      <v-toolbar-title>{{todaysMenu(menus).name}}</v-toolbar-title>
        <template v-slot:prepend>
          <v-icon icon="mdi-cart" @click="checkoutFlag=(!checkoutFlag)"/>
        </template>
    </v-toolbar>
    <v-navigation-drawer
        v-model="checkoutFlag"
        id="nav-drawer"
        temporary
        width="100%"
        location="left"
    >
        <CheckoutDrawer
            id="checkout"
            :selected="selections"
            @getPermFlag="fromDrawer"
        />
    </v-navigation-drawer> 
    <div v-if="todaysMenu(menus)">
        <v-dialog
            v-model="modalFlag"
            fullscreen
            persistent
        >
            <v-card>
                <v-toolbar>
                    <template v-slot:append>
                        <v-app-bar-nav-icon icon="mdi-close" @click="modalFlag=false"></v-app-bar-nav-icon>
                    </template>
                </v-toolbar>
                <SelectionModal
                    :selection="selection"
                    @getSelection="fromModal"
                /> 
            </v-card>
        </v-dialog>
        <v-expansion-panels
            id="top"
            flat
            tile
        >
            <v-expansion-panel
                v-for="(section,i) in todaysMenu(menus).sections"
                id="ex-panel"
                :key="i"
                :title="section.name"
            >
                <v-expansion-panel-text>
                   <OrderItem
                        :theItems="items.filter(item=> item.section_id === section._id)"
                        @passToMenu="fromItem"
                    />  
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
    <div v-else>
        <p>Sorry the restaurant is closed </p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
    items:{
        type: Array,
        required: true
    },
    menus:{
        type: Array,
        required: true
    },
    sections:{
        type: Array,
        required: true
    }
});
</script>
<script>
export default {
    data(){
        return{
            checkoutFlag: false,
            selections: [],
            selection: {},
            modalFlag: false,
        }
    },
    methods:{
        makeId(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
            }
            return result;
        },
            todaysMenu: (menus) => {
         /**    const date = new Date()
            const today = date.getDay()
            const nowHours = date.getHours()
            const nowMins = date.getMinutes()
            menus.forEach( (menu) => {
                if(menu.days.includes(today)){
                    const startHours = Math.floor(menu.starttime/100)
                    if(nowHours > startHours){
                        const endHours = Math.floor(menu.endtime/100)
                        if(nowHours < endHours){
                         
                            return menu
                        }
                    }
                    else if ( nowHours === startHours){
                        const startMins = menu.starttime % 100
                        if( nowMins >= startMins){
                         
                            return menu
                        }
                    }
                    else {return {name:"closed"}}
                }
            })*********/
           return menus[0]
        },
        /**
         * receieves item data from <OrderItem/>
         * input: Item clicked Object
         * output: N/A
         * creates object with data for
         * <SelectionModal/>
         */
        fromItem(selection){
            if( !selection.options ){
                selection.options=[];
            }
            
            if( selection.options.length ){
                selection.options.forEach((option,i)=>{
                    //if option is not an obj
                    //make it an obj and populate
                    //suggested and ingr arrays
                    if(typeof option !== Array){    
                        const section = this.sections.filter((section)=>{
                            return section._id ===option;
                        })
                        section.forEach((sec)=>{
                            const sectionHolder = {
                                choice: sec.choice ? sec.choice : 0,
                                ingr: sec.ingr ? sec.ingr : [],
                                name: sec.name,
                                suggested: sec.suggested ? sec.suggested : [],
                                _id: sec._id,
                                choices: [],
                            }
                                //replace _id with section obj
                            selection.options.splice(i,1,sectionHolder);
                            option=sectionHolder;
                        })
                        
                        
                    }
                    //add suggested items to choices array
                    //should ne in selection modal
          /*          if(option.suggested){   
                        if(option.suggested.length){
                            option.suggested.forEach((item)=>{
                                const contains = option.choices.some(el=>el._id===item._id);
                                console.log('s',contains)
                                if(!contains){
                                    const itemHolder = {
                                        _id: item._id,
                                        name: item.name,
                                        price: item.price ? item.price : 0,
                                        section_id: item.section_id,
                                        options: item.options ? item.options : [],
                                    }
                                    option.choices.push(itemHolder)
                                }
                            })
                        }
                    } */
                    //find items that belong to this
                    //section and add them to ingr array
                    const optionItems = this.items.filter((val)=>{ return val.section_id === option._id});
                    if(optionItems.length){
                        optionItems.forEach((item)=>{
                            const contains = (option.ingr.some(el=>el._id===item._id))
                            console.log('i',contains)
                            if(!contains){
                                const itemHolder = {
                                    _id: item._id,
                                    name: item.name,
                                    price: item.price ? item.price : 0,
                                    section_id: item.section_id,
                                    options: item.options ? item.options : [],
                                }
                                //add the item to the ingr array
                                if(itemHolder.options.length){
                                    itemHolder.options.forEach(op=>{
                                        op.choices=[];
                                        if(op.suggested.length){
                                            op.suggested.forEach((sug)=>{
                                                const sugHolder = {
                                                    name: sug.name,
                                                    _id: sug._id,
                                                    price: sug.price ? sug.price : 0,
                                                    section_id: sug.section_id,
                                                }
                                                op.choices.push(sugHolder)
                                            })
                                        }
                                    })
                                }
                                option.ingr.push(itemHolder);
                            }
                            
                        });
                    }
                                                 
                   
                })
            }
            //create selection to pass to modal
            //this is the item selected from the menu
            this.selection = {
                name: selection.name,  
                description: selection.description ? selection.description : "",
                price: selection.price ? selection.price : 0,
                section_id: selection.section_id,
                section: selection.section ? selection.section : {},
                _id: selection._id,
                options: selection.options ? selection.options : [],
                _key: this.makeId(),
            };
            //open modal
            this.modalFlag=true;
            
        },
        fromDrawer(){
            console.log('from Drawer')
        },
        /**
         * recieves the options choosen from <SelectionModal/>
         * closes modal
         * opens checkout drawer
         */
        fromModal(sel){
            console.log('in order menu from modal',sel)
            if(sel != null){               
                this.selections.push(sel)
            }
            this.modalFlag=false
            if(this.selections.length > 0){
                this.checkoutFlag = true;
            }
        }
    }
}
</script>