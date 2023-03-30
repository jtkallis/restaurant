<template>
  <v-row>
    <v-col cols="12">
      <v-list v-if="selected.length">
        <v-list-item :prepend-icon="mdi-cart">
          <v-btn @click="checkoutFormFlag=true">check out</v-btn>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          v-for="(sel,i) in selected"
          :key="i"
          :prepend-icon="mdiNum(i)"
          :title="titleString(sel)"
          class="overflow-auto"
        >
        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-close"
            variant="text"
            @click="selected.splice(i,1)"
          ></v-btn>
        </template>
        <v-list-item-subtitle v-for="(option) in sel.options" :key="option._id">{{subtitleString(option)}}</v-list-item-subtitle>
        </v-list-item>
        
        <v-divider></v-divider>
        <br/>
      </v-list>
    </v-col>
    <v-col v-show="checkoutFormFlag">
      <div>
        <v-form>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="order.name"
                label="name"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="order.phone"
                label="phone"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="order.notes"
                label="notes"
              ></v-text-field>
            </v-col>
          </v-row>
            <v-btn
              color="success"
              @click="completeOrder"
            >
              Submit Order
            </v-btn>
            <v-btn @click="flipFlags">Edit Order</v-btn>
            <v-btn @click="cancelOrder">Cancel order</v-btn>
        </v-form>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props:{
    selected: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      checkoutFormFlag: false,
      order: {
        name: '',
        phone: '',
        notes: '',
        total: this.orderTotal,
        order: this.selected
      }
    }
  },
  computed: {
    orderTotal(){
      let total = 0
      this.selected.forEach(sel=>{
        total += sel.price
      })
      return Math.round(total*1.0775);
    },
    subTotal(){
      return "subtotal: "+ this.formatPrice((this.orderTotal*0.0775/1.0775));
    },
    orderTax(){
      return "tax: "+ this.formatPrice((this.orderTotal*0.0775/1.0775));
    },
    totalWithTax(){
      return "TOTAL: "+ this.formatPrice(this.orderTotal);
    }
  },
  methods: {
    formatPrice(price){
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      console.log(price)
      return formatter.format(price/100);
    },
    titleString(sel){
      return sel.name + " ---  " + this.formatPrice(sel.price);
    },
    subtitleString(sel){
      let str = "";
      str += sel.name+": ";
      if(sel.choices != null ){
        let i;
        for(i=0;i<sel.choices.length;i++){
          str += sel.choices[i].name + " ";
          if(sel.choices[i].price>0){
            str += "-" + this.formatPrice(sel.choices[i].price);
          }
          if(i!==sel.choices.length-1){
            str += ", "
          }
        }
      }
      return str;
    },
    mdiNum(i){
      return "mdi-numeric-"+(i+1);
    },
    flipFlags(){
      this.$emit("getPermFlag");
      this.order={};
      this.checkoutFormFlag = false;
    },
    cancelOrder(){
      this.selected.splice(0,this.selected.length);
      this.$router.push({path: '/',});
    },
    getText(){
      let item=1;
      let orderText = "";
      this.selected.forEach(sel =>{
          orderText += item + ") " + sel.name + " "; //main item name
          if(sel.options.length){
            orderText += "w/ ";
            let i;
            for(i=0;i<sel.options.length;i++){
              if(sel.options[i].choices){
                let j;
                for(j=0;j<sel.options[i].choices.length;j++){
                  orderText += sel.options[i].choices[j].name; // side item name
                  if(sel.options[i].choices[j].options){
                      sel.options[i].choices[j].options.forEach((option)=>{
                        if(option.choices.length){
                          let k;
                          orderText += " (w/ "
                          for(k=0;k<option.choices.length;k++){
                            orderText += option.choices[k].name;  // side item's side's name (ex bp w/ sour cream)
                            if(k==option.choices.length-1){orderText +=  ")"}
                            else{orderText += ", "}
                          }
                        }
                      })
                  }
                  if(j==sel.options[i].choices.length-1){ orderText += " - ";}
                  else{orderText += ", ";}
                }
              }
            }
          }
          item+=1;
        });
        orderText +=  this.totalWithTax;
        orderText+= " for: " + this.order.name + 
              " phone:" + this.order.phone + 
              " note: " + this.order.notes;
        return orderText;
    },
    async completeOrder(){
      if(this.selected ){
        const holder = {
          name: this.order.name ? this.order.name : 'no name given',
          phone: this.order.phone ? this.order.phone : 'no number given',
          total: this.orderTotal ? this.orderTotal : -1,
          notes: this.order.notes ? this.order.notes : 'no notes',
          order: this.order.order ? this.order.order : this.selected,
          message: this.getText() ? this.getText() : 'error no order attached'
        };
        const res = await useFetch('/api/orders/', {
            method: 'POST',
            body: JSON.stringify(holder)
        })
        this.$router.push({path: '/',})
      }
    }
  }
}
</script>