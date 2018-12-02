
// Change the configurations.  
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };
        
  // Initialize Firebase.
  firebase.initializeApp(config);

new Vue({
  el: "#app",
	mounted:function(){
    this.purchases = []
		this.total = 0
  },
	data: {
		paypal: {
      sandbox: 'AZXZQP1v8weN8ZkVQ4KwkjLSgPaMzmA8R9xcEMhD30vL0DK1MOU9YJCLSI1lld5oWNFlVj6hp8F1TTvO',
      production: 'AVZhosFzrnZ5Mf3tiOxAD0M6NHv8pcB2IFNHAfp_h69mmbd-LElFYkJUSII3Y0FPbm7S7lxBuqWImLbl'
    },
    item: {
			Item: "",
			Price: "",
			Quantity: 0
		},
		purchases: [{
			Object: {},
			Item: "",
			Price: "",
			Quantity: 0,
			Sold: 0
		}],
		total: 0
  },
	methods: {
		clear() {
			this.purchases = []
			this.total = 0
		},
		completeCheckout() {
			
			try {
				for (let i = 0; i < this.purchases.length; i++) {
        	this.$firestore.items.doc(this.purchases[i].Object['.key']).update({
						Quantity: this.purchases[i].Quantity - this.purchases[i].Sold
					})
    		}
				this.purchases = []
				this.total = 0
				alert("Transaction Completed!")
			} catch(error){
				alert("There was an error, please try again.")
			}
					
		},
		addPurchase(item) {
			let isValid = false
			let foundIndex = 0

			let purchase = {
				Object: item,
				Item: item.Item,
				Price: item.Price,
				Quantity: item.Quantity,
				Sold: 1
			}

			for (foundIndex = 0; foundIndex < this.purchases.length; foundIndex++) {
        if (this.purchases[foundIndex].Item === purchase.Item) {
            isValid = true
						break
        }
    	}
			
			if(!isValid){
				this.purchases.push(purchase)
			} else {
				this.purchases[foundIndex].Sold++
			}

      this.total += parseFloat(item.Price.substr(1)) // delete $ and calulate total
			
		}
  },
	firestore() {
		return {
			items: firebase.firestore().collection("SnackShackItems")
		}
  }
})
