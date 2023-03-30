<script setup>
import SelectionModal from './SelectionModal.vue'
</script>
<template>
  <v-card>
    <v-card-title v-if="selection.name">
      {{selection.name}} -- ${{selection.price/100}}
    </v-card-title>
    <v-card-subtitle v-if="selection.description">{{selection.description}}</v-card-subtitle>
    <v-card-item v-if="selection.options">
      <v-card
        v-for="(option,i) in selection.options"
        :key="i"
      >
        <v-card-title>{{option.name}}</v-card-title>
        <v-select
          v-model="option.choices"
          :items="option.ingr"
          :label="getLabel(option)"
          multiple
          class="overflow-auto"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip>
              {{ item.value.name }}
              <v-icon
                icon="mdi-close"
                @click="option.choices.splice(index,1)"
              />
            </v-chip>
          </template>
          <template v-slot:item="{item}">
            <v-list-item @click="addIngr(item.value,i)">{{ item.value.name }}</v-list-item>
          </template>
        </v-select>
        <v-dialog v-model="modalFlag">
            <SelectionModal :selection="theItem" :index="i" @getSelection="fromModal"/>
          </v-dialog>
      </v-card>
    </v-card-item>
    <v-card-actions>
      <v-btn @click="submitOrder(selection)">Add to order</v-btn>
      <v-btn @click="cancelSelection">Cancel Selection</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    selection: {
      type: Object,
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
    }
  },
  methods: {
    getLabel(option){
      console.log(option);
      let str='';
      if(option){
        if(option.choices.length){
          str+="Choose: " + (option.choice - option.choices.length);
        }
        else{
          console.log('els')
          str+="click for menu"
        }
      }
      else{
        str="no options";
      }
      return str;

    },
    addIngr(ingr, i){
      console.log('ingr',ingr)
      console.log('indx',i)
      let ingrHolder={
        name: ingr.name,
        price: ingr.price,
        section_id: ingr.section_id,
        options: [],
        _key: this.makeId(),
      }
      if(ingr.options){
        ingrHolder={...ingrHolder, index: i};
        if(ingr.options.length){
          ingr.options.forEach((option)=>{
            //initialize choices array
            const sectionHolder = {
              ...option,
              choices: [],
            }
            
            if(sectionHolder.suggested.length){
              console.log('d')
              sectionHolder.suggested.forEach((item)=>{
                //add suggested items
                const itemHolder = {
                    ...item,
                    _key: item._key ? item._key : this.makeId(),
                }
                sectionHolder.choices.push(itemHolder)
                console.log(sectionHolder)
              })
            }
            ingrHolder.options.push(sectionHolder)
          })
          console.log('mj',ingrHolder)
          if(this.selection.options[i].choice>0){
            if(this.selection.options[i].choice - this.selection.options[i].choices.length){
              this.theItem=ingrHolder;
              this.modalFlag=true;
            }
          }
        }else{
          console.log('y')
          this.selection.price+=ingrHolder.price;
          this.selection.options[i].choices.push(ingrHolder)
        }
      }else{
        console.log('z')
        this.selection.price+=ingrHolder.price;
        this.selection.options[i].choices.push(ingrHolder)
      }      
    },
    makeId() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let counter = 0;
        while (counter < 12) {
          result += characters.charAt(Math.floor(Math.random() * 12));
          counter += 1;
        }
        return result;
    },
    submitOrder(selection, modalFlag){
      console.log('submit',selection)
      console.log('no this mf', modalFlag)
      console.log(this.selection)
      console.log('this mf',this.modalFlag)
        const selectHolder={
          ...selection,
        }
        console.log('submit else emit',selectHolder)
        this.$emit("getSelection",selectHolder)
        this.modalFlag=false; 
    },
    fromModal(sel){
      console.log('nested modal',sel)
      console.log('cvb',this.selection)    
      console.log(this.modalFlag) 
      //if item has options add the
      //cost of choices to price
      if(sel.options){
        if(sel.options.length){
          sel.options.forEach(option=>{
            if(option.choices){
              if(option.choices.length){
                option.choices.forEach(choice=>{
                  sel.price+=choice.price;
                })
              }
            }
          })
        } 
      }
      const selHolder = {...sel}
      this.selection.options[selHolder.index].choices.push(selHolder);
      this.modalFlag=false;
    },
    cancelSelection(){
      console.log('cancel emit')
      this.$emit("getSelection")
    }
  }
}
</script>