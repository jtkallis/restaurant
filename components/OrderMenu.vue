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
        todaysMenu(menus){
            const date = new Date()
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
            })
          // return menus[1]
        },
        /**
         * receieves item data from <OrderItem/>
         * input: Item clicked Object
         * output: N/A
         * creates object with data for
         * <SelectionModal/>
         */
        fromItem(selection){
            console.log('fromItem',selection)
            //initialize object to disconnect
            //from original item
            let selectionHolder={
                name: selection.name,
                price: selection.price,
                section_id: selection.section_id,
                options: [],
            }
            if( selection.options ){
                if(selection.options.length){
                    let i;
                    for(i=0;i<selection.options.length;i++){
                        //if option is not an obj
                        //make it an obj 
                        if(typeof selection.options[i] === "string"){ 
                            console.log('string')   
                            selection.options[i] = this.sections.find(section=>section._id===selection.options[i]);
                            console.log('string to obj', selection)                        
                        }
                        //initialize object to disconnect
                         //from original option and add choices[]
                        const sectionHolder = {...selection.options[i], choices: []}
                        //if option has suggested
                        //add them to empty choices array
                        if(sectionHolder.suggested.length){
                            console.log('d')
                            sectionHolder.suggested.forEach((item)=>{
                                //add suggested items
                                const itemHolder = {...item,}
                                sectionHolder.choices.push(itemHolder)
                                console.log(sectionHolder)
                            })
                        }
                        //finally add modified option object to selectionHolder.options[]       
                        selectionHolder.options.push(sectionHolder);
                    }
                }
            }
            console.log('before end of fromItem',selectionHolder)
            console.log(this.selection)
            //create selection to pass to modal
            //this is the item selected from the menu
            this.selection = {
                name: selectionHolder.name,  
                description: selectionHolder.description ? selectionHolder.description : "",
                price: selectionHolder.price ? selectionHolder.price : 0,
                section_id: selectionHolder.section_id,
                section: selectionHolder.section ? selectionHolder.section : {},
                options: selectionHolder.options ? selectionHolder.options : [],
            };
            console.log('end from Item',this.selection)
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