class Container{
    constructor(path){
        this.path = path;  
    }

    fs = require('fs'); 

    
    async save(product){    //save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        try {
            if(!(this.fs.existsSync(this.path)))    await this.fs.promises.writeFile(this.path , '[]')

            const objectsList = JSON.parse(await this.fs.promises.readFile(this.path, 'utf-8'))
            
            if ( objectsList.length === 0) product['id'] = 1 
            else product['id'] = objectsList[objectsList.length - 1].id + 1  
            
            objectsList.push(product)
            const objectsListSerialized = JSON.stringify(objectsList, null, 2)
            await this.fs.promises.writeFile(this.path , objectsListSerialized)
            return product.id;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(idParameter){ //getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
       try{
        const objectsList = JSON.parse(await this.fs.promises.readFile(this.path, 'utf-8'))
        const productFind = objectsList.find(e => e.id == idParameter);

         if (productFind != undefined) return productFind;
         else return null;
        } catch (err) {
        console.log(err)
      }    
    }

    async getAll() {      // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.

        try {
          const listProduct = await this.fs.promises.readFile(this.path, 'utf-8')
          return JSON.parse(listProduct)
        } catch (err) {
          console.log(err)
        }
      } 
     
    
    async deleteById(idParameter){ //deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
        try {
            const objectsList = JSON.parse(await this.fs.promises.readFile(this.path, 'utf-8'))
            const productFindIndex = objectsList.findIndex(e => e.id == idParameter);
            objectsList.splice(productFindIndex,1)  
            const objectsListSerialized = JSON.stringify(objectsList, null, 2) 
            await this.fs.promises.writeFile(this.path , objectsListSerialized)        
        } catch (error) {
            console.log(error)
        }   
    }

    async deleteAll(){   //deleteAll(): void - Elimina todos los objetos presentes en el archivo.
        try {
            await this.fs.promises.writeFile(this.path , '[]')
        } catch (err) {
            console.log(err)
        }
    }

}
    module.exports.Container = Container;

/* 
    let objetoPrueba = {
        title: "Pinza Bremen",
        price: 3500,
        thumbnail: 'Imagen Pinza Bremen'
    }
    
    let objetoPrueba2 = {
        title: "Amoladora Bosch",
        price: 9800,
        thumbnail: 'Imagen Amoladora Bosch'
    }
    
    let objetoPrueba3 = {
        title: "Destornillador",
        price: 2300,
        thumbnail: 'Imagen Destornillador'
    }
    
    let objetoPrueba4 = {
        title: "Espatula",
        price: 250,
        thumbnail: `Imagen Espatula`
    }



const test = async () => {

    const contenedor = new Container('.\productos.txt')
    
    console.log(await contenedor.save(objetoPrueba)) 
    console.log(await contenedor.save(objetoPrueba2)) 
    console.log(await contenedor.save(objetoPrueba3)) 
    console.log(await contenedor.save(objetoPrueba4)) 

    console.log(await contenedor.getById(2)) // "Amoladora Bosch",

    console.log(await contenedor.getAll()); 

    await contenedor.deleteById(3)  // Destornillador

    console.log(await contenedor.getAll());

    //await contenedor.deleteAll();

    
  }
  
   
  
  test()
   */
   