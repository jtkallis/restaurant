<script setup>
import SelectionModal from './SelectionModal.vue'
</script>
<template>
  <v-card id="divv">
    <v-toolbar id="toolbar">
        <template v-slot:append>
            <v-app-bar-nav-icon icon="mdi-close" @click="$emit('getSelection')"></v-app-bar-nav-icon>
        </template>
    </v-toolbar>
    <v-card id="modal">
      <v-card-title v-if="selection.name" id="title">
        {{selection.name}} -- ${{selection.price/100}}
      </v-card-title>
      <v-card-subtitle v-if="selection.description">{{selection.description}}</v-card-subtitle>
      <v-card-item v-if="selection.options" id="card-item">
        <v-card
          v-for="(option,i) in selection.options"
          :key="i"
        >
          <v-card-title>{{option.name}}</v-card-title>
          <v-select
            v-model="option.choices"
            :items="option.ingr"
            :label="getLabel(option)"
            :menu="openFlag"
            ref="select"
            multiple
            :menu-props="{
              closeOnContentClick: true,
            }"
            class="overflow-auto"
          >
            <template #selection="{ item, index }">
              <v-chip @click="$refs.select[i].blur()">
                {{ item.value.name}} {{  item.value.price ? "$"+item.value.price/100 : null }}
                <v-icon
                  icon="mdi-close"
                  @click="option.choices.splice(index,1)"
                />
              </v-chip>
            </template>
            <template #item="{item}">
              <v-list-item @click="addIngr(item.value,i)">{{ item.value.name }}</v-list-item>
            </template>
          </v-select>
          <v-dialog
            v-model="modalFlag"
            fullscreen
            persistent
          >
            <SelectionModal :selection="theItem" :index="i" @getSelection="fromModal"/>
          </v-dialog>
        </v-card>
      </v-card-item>
      <v-card-actions id="actions">
        <v-btn @click="submitOrder(selection)">Add to order</v-btn>
        <v-btn @click="cancelSelection(selection)">Cancel Selection</v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>
<script>
export default {
  props: {
    selection: {
      type: Object,
      requierd: true
    },
    sections: {
      type: Array,
      requierd: true
    },
    index: {
      type: Number,
      required: false
    }
  },
  data(){
    return{
      toppingFlag: false,
      modalFlag: false,
      modalIndex:0,
      theItem: {},
      items: [],
      openFlag: false,
    }
  },
  /**Note:
   * change v-select so @click will replace the current selection with the click
   */
  computed: {
    removeChoice(){}
  },
  methods: {
    callFunction(index){
      this.$refs.select[index].blur()
    },
    getLabel(option){
      let str='';
      if(option){
        if(option.choices && option.choice){
          str+="Choose: " + (option.choice - option.choices.length);
        }
        else{
          str+="click for menu"
        }
      }
      else{
        str="no options";
      }
      return str;

    },
    addIngr(ingr, i){
      console.log('i ', ingr)
      let ingrHolder={
        name: ingr.name,
        price: ingr.price,
        section_id: ingr.section_id,
        options: [],
      }
      if(ingr.options){
        ingrHolder={...ingrHolder, index: i};
        if(ingr.options.length){
          ingr.options.forEach((option)=>{
            //initialize choices array
            console.log('optio',option)
            if(typeof option === 'string'){
              option = this.sections.find(section=>section._id===option)
            }
            const sectionHolder = {...option, choices: []}
            if(sectionHolder.suggested){
              if(sectionHolder.suggested.length){
                sectionHolder.suggested.forEach((item)=>{
                  //add suggested items
                  const itemHolder = {...item,}
                  sectionHolder.choices.push(itemHolder)
                })
              }
            }
            ingrHolder.options.push(sectionHolder)
          })
          if(this.selection.options[i].choice){
            if(this.selection.options[i].choice - this.selection.options[i].choices.length){
              this.theItem=ingrHolder;
              this.modalFlag=true;
            }else{
                this.theItem=ingrHolder;
                this.modalFlag=true;
            }
          }else{
              this.theItem=ingrHolder;
              this.modalFlag=true;
          }
        }else{
          if(!this.selection.options[i].choices){
            this.selection.options[i].choices=[]
          }
          this.selection.options[i].choices.push(ingrHolder)
        }
      }else{
        this.selection.options[i].choices.push(ingrHolder)
      } 
      console.log('c',this.selection)    
    },
    submitOrder(selection){
      //adds the price of any add-ons
      if(selection.options){
        if(selection.options.length){
          selection.options.forEach((option)=>{
            if(option.choices){
              if(option.choices.length){
                option.choices.forEach((choice)=>{
                  if(choice.price){
                    console.log('price', choice.price)
                    let price = Number(selection.price);
                    price+=Number(choice.price);
                    String(price)
                    selection.price= price;
                  }
                })
              }
            }
          })
        }
      }
        const selectHolder={
          ...selection,
        }
        this.$emit("getSelection",selectHolder)
        this.modalFlag=false; 
    },
    fromModal(sel){ 
      //if item has options add the
      //cost of choices to price
      if(sel){
        console.log('fromModal',sel)
        const selHolder = {...sel}
        this.selection.options[selHolder.index].choices.push(selHolder);
      }
      this.modalFlag=false;
    },
    cancelSelection(){
      if(this.selection.options.length){
        this.selection.options.forEach((option)=>{
          option.choices=[];
          if(option.suggested.length){
            option.suggested.forEach((item)=>{
              const suggest = {...item};
              option.choices.push(suggest)
            })
          }
        })
      }
      this.$emit("getSelection")
    }
  }
}
</script>