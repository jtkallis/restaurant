<template>
  <div id="section-component">
    <v-toolbar id="bar">
      <v-toolbar-title>{{ todaysMenu(menus).name ? todaysMenu(menus).name : "no menu name" }}</v-toolbar-title>
        <template v-slot:prepend>
          <v-icon icon="mdi-cart" @click="checkoutFlag=(!checkoutFlag)"/>
        </template>
    </v-toolbar>
    <v-navigation-drawer
        v-model="checkoutFlag"
        id="nav-drawer"
        temporary
        max-width="none"
        width="50%"
        location="left"

    >
        <CheckoutDrawer
            id="checkout"
            :selected="selections"
        />
    </v-navigation-drawer> 
    <div v-if="thisMenu">
        <v-dialog
            v-model="modalFlag"
            fullscreen
            persistent
        >
            <v-card
                id="card"
            >
                <SelectionModal
                    :selection="selection"
                    :sections="sections"
                    @getSelection="fromModal"
                /> 
            </v-card>
        </v-dialog>
        <v-expansion-panels
            id="top"
            flat
            tile
            v-if="thisMenu.sections"
        >
            <v-expansion-panel
                v-for="(section,i) in thisMenu.sections"
                id="ex-panel"
                :key="i"
                :title="section.name"
            >
                <v-expansion-panel-text id="panel">
                   <OrderItem
                        :theItems="items.filter(item=> item.section._id === section._id)"
                        @passToMenu="fromItem"
                    />  
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
    <div v-else>
        <v-card>
            <v-card-title>The Restaurant is closed</v-card-title>
        </v-card>
    </div>    
  </div>
</template>
<script>
export default {
    props:{
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
    },
    data(){
        return{
            checkoutFlag: false,
            selections: [],
            selection: {},
            modalFlag: false,
            modalFlag2: false,
            tab: null,
            thisMenu: this.todaysMenu(this.menus)
        }
    },
    methods:{
        sectionItems(id){
            let secItems = [];
            this.items.filter(item=>{
                if(item.section){
                    if(item.section._id===id){
                        secItems.push(item)
                    }
                }
            })
            return secItems;
        },
        makeTwo(number){
            let formattedNumber = number.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })
            return formattedNumber;
        },
        todaysMenu(menus){
            const date = new Date()
            const today = date.getDay()
            const nowHours = date.getHours()
            //const nowMins = date.getMinutes()
            for(let i=0; i < menus.length; i++){
               let day=menus[i].days.find((day)=>{return day.day_id===today})
               console.log(day)
               if(day.start_pm==="pm"){
                    if(day.startHour < 12){day.startHour += 12;}
                }
                if(day.end_pm ==="pm"){
                    if(day.endHour < 12){ day.endHour +=12;}
                }
                console.log(day.startHour)
                console.log(day.endHour)
                if(nowHours <= day.endHour && nowHours >= day.startHour){
                    console.log("within Hours")
                    console.log(day.startMin10+ day.startMin01)
                    console.log(menus[i])
                    return menus[i];
                }
                else{console.log('outside hours')}
            }
            return {name: "menu not available"}
        },
        fromDrawer(){
            console.log('')//avoids warning
        },
        /**
         * receieves item data from <OrderItem/>
         * input: Item clicked Object
         * output: N/A
         * creates object with data for
         * <SelectionModal/>
         */
        fromItem(selection){
            //initialize object to disconnect
            //from original item
            console.log('fis', selection)
            let selectionHolder={
                name: selection.name,
                price: selection.price,
                section: selection.section,
                options: [],
            }
            if( selection.options ){
                if(selection.options.length){
                    let i;
                    for(i=0;i<selection.options.length;i++){
                        //if option is not an obj
                        //make it an obj 
                        if(typeof selection.options[i] === "string"){  
                            selection.options[i] = this.sections.find(section=>section._id===selection.options[i]);                       
                        }
                        //initialize object to disconnect
                         //from original option and add choices[]
                        const sectionHolder = {...selection.options[i], choices: []}
                        //if option has suggested
                        //add them to empty choices array
                        if(sectionHolder.suggested){
                            if(sectionHolder.suggested.length){
                                sectionHolder.suggested.forEach((item)=>{
                                    //add suggested items
                                    const itemHolder = {...item,}
                                    sectionHolder.choices.push(itemHolder)
                                })
                            }
                        }
                        //finally add modified option object to selectionHolder.options[]       
                        selectionHolder.options.push(sectionHolder);
                    }
                }
            }
            //create selection to pass to modal
            //this is the item selected from the menu
            this.selection = {
                name: selectionHolder.name,  
                description: selectionHolder.description ? selectionHolder.description : "",
                price: selectionHolder.price ? selectionHolder.price : 0,
                section: selectionHolder.section ? selectionHolder.section : {},
                options: selectionHolder.options ? selectionHolder.options : [],
            };
            //open modal
            console.log('d',this.selection)
            this.modalFlag=true;
            
        },
        /**
         * recieves the options choosen from <SelectionModal/>
         * closes modal
         * opens checkout drawer
         */
        fromModal(sel){
            if(sel != null){               
                this.selections.push(sel)
            }
            this.modalFlag=false;
            if(this.selections.length > 0){
                this.checkoutFlag = true;
            }
        }
    }
}
</script>
<style>
#subtitle {
    text-align: center;
}
</style>