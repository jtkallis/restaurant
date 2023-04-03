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
        >   ************RESTAURANT IS CLOSED***this is for example purposes****************
            <v-expansion-panel
                v-for="(section,i) in menus[1].sections"
                id="ex-panel"
                :key="i"
                :title="section.name"
            >
                <v-expansion-panel-text>
                    
                   <OrderItem
                        :theItems="items.filter(item=> item.section_id === section._id)"
                        @passToMenu="fromItem"
                        disabled
                    />  
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
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
        }
    },
    methods:{
        todaysMenu(menus){
            console.log('menus',menus)
            const date = new Date()
            const today = date.getDay()
            const nowHours = date.getHours()
            const nowMins = date.getMinutes()
            console.log(date)
            console.log(today)
            console.log(nowHours)
            console.log(nowMins)
            

            menus.forEach( (menu) => {
                //if today is in the days array
                console.log('menu',menu);
                console.log(typeof today)
                console.log(menu.days.some(day=>day.index===today))
                let flag =  menu.days.some(day=>day.index===today);
                if( flag ){console.log('0')
                    const startHours = Math.floor(menu.start_time/100);
                    const startMins = menu.start_time % 100;
                    const endHours = Math.floor(menu.end_time/100);
                    const endMins = menu.end_time % 100;
                    console.log('h ',startHours,' m ',startMins)
                    console.log(endHours,endMins)
                    console.log(nowHours>=startHours)
                    console.log(nowHours <=endHours)
                    //find out if the menu is open
                    if( (nowHours >= startHours) && (nowHours <= endHours) ){
                        console.log('1')
                        if(startMins){
                            console.log('2')
                            if(nowMins>startMins){
                                console.log('3')
                                if(endMins){
                                    console.log('4')
                                    if(nowMins<endMins){
                                        console.log('5')
                                        return menu;
                                    }else{return {name: 'restaurant is closed, ordering is unavailable -- 4'}}
                                }else{
                                    return menu;
                                }
                            }else{return {name: 'restaurant is closed, ordering is unavailable -- 3'}}
                        }else{
                            if(endMins){
                                console.log('6')
                                if(nowMins<endMins){
                                    console.log('7')
                                    return menu;
                                }
                                else{return {name: 'restaurant is closed, ordering is unavailable -- 2'}}
                            }
                            else{
                                console.log(menu)
                                return menu;
                            }
                        }
                    }else{return {name: 'restaurant is closed, ordering is unavailable -- 1'}}
                }else{return {name: 'restaurant is closed, ordering is unavailable'}}
            })
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
                            selection.options[i] = this.sections.find(section=>section._id===selection.options[i]);                       
                        }
                        //initialize object to disconnect
                         //from original option and add choices[]
                        const sectionHolder = {...selection.options[i], choices: []}
                        //if option has suggested
                        //add them to empty choices array
                        if(sectionHolder.suggested.length){
                            sectionHolder.suggested.forEach((item)=>{
                                //add suggested items
                                const itemHolder = {...item,}
                                sectionHolder.choices.push(itemHolder)
                            })
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
                section_id: selectionHolder.section_id,
                section: selectionHolder.section ? selectionHolder.section : {},
                options: selectionHolder.options ? selectionHolder.options : [],
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