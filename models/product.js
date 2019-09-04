const fs = require("fs")
const path = require("path")
const location = path.join(
	path.dirname(process.mainModule.filename),
	"data",
	"products.json"
)

const Product = {
	add: function(newProduct) {
		fs.readFile(location, (err, data) => {
			let products = []
			if (!err) {
				products = JSON.parse(data)
			}
			products.push(newProduct)
			fs.writeFile(location, JSON.stringify(products), err => {
				err
					? console.log(err)
					: console.log(`New Product "${newProduct}" Added`)
			})
		})
	},
	fetchAll: function(callback) {
		// we can't just return the data we need because this is an asynchronous operation, so instead we send it a function to run after the data is read, and that function renders our shop.
		fs.readFile(location, (err, data) => {
			if (err) {
				return callback([])
			}
			callback(JSON.parse(data))
		})
	}
}

module.exports = Product
