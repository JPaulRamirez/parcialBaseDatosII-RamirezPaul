//Objetivos de Aprobación No Directa (Calificación de 4 a 5 puntos):

//1) Crear el script .js con la creación de la base de datos y las colecciones.


db.cafes.insertMany([
  {
    tipo: "espresso",
    ingredientes: ["chocolate", "canela"],
    peso: 220,
    intensidad: "alta",
    precio: [
      { tipo: "efectivo", precio: 500 },
      { tipo: "tarjeta", precio: 550 }
    ],
    contieneLeche: false,
    tostador: {
      localidad: "San Justo",
      nombre: "Tostadores SJ",
      cuit: "30-12345678-9"
    }
  },
  {
    tipo: "filtrado",
    ingredientes: ["vainilla", "caramelo"],
    peso: 250,
    intensidad: "media",
    precio: [
      { tipo: "efectivo", precio: 480 },
      { tipo: "tarjeta", precio: 530 }
    ],
    contieneLeche: true,
    tostador: {
      localidad: "Córdoba",
      nombre: "Café Cba",
      cuit: "30-87654321-0"
    }
  },
  {
    tipo: "cold brew",
    ingredientes: ["vainilla", "chocolate"],
    peso: 240,
    intensidad: "media",
    precio: [
      { tipo: "efectivo", precio: 420 },
      { tipo: "tarjeta", precio: 470 }
    ],
    contieneLeche: false,
    tostador: {
      localidad: "San Telmo",
      nombre: "Tostadores Porteños",
      cuit: "30-23456789-1"
    }
  },
  {
    tipo: "descafeinado",
    ingredientes: ["caramelo"],
    peso: 210,
    intensidad: "baja",
    precio: [
      { tipo: "efectivo", precio: 360 },
      { tipo: "tarjeta", precio: 400 }
    ],
    contieneLeche: true,
    tostador: {
      localidad: "Mendoza",
      nombre: "Café Andino",
      cuit: "30-98765432-1"
    }
  },
  {
    tipo: "espresso",
    ingredientes: ["chocolate"],
    peso: 200,
    intensidad: "alta",
    precio: [
      { tipo: "efectivo", precio: 510 },
      { tipo: "tarjeta", precio: 560 }
    ],
    contieneLeche: false,
    tostador: {
      localidad: "Rosario",
      nombre: "Rosario Coffee",
      cuit: "30-11223344-5"
    }
  },
  {
    tipo: "cold brew",
    ingredientes: ["vainilla"],
    peso: 230,
    intensidad: "alta",
    precio: [
      { tipo: "efectivo", precio: 530 },
      { tipo: "tarjeta", precio: 580 }
    ],
    contieneLeche: true,
    tostador: {
      localidad: "Santa Fe",
      nombre: "SF Beans",
      cuit: "30-55667788-9"
    }
  },
  {
    tipo: "filtrado",
    ingredientes: ["chocolate", "whisky"],
    peso: 270,
    intensidad: "media",
    precio: [
      { tipo: "efectivo", precio: 490 },
      { tipo: "tarjeta", precio: 540 }
    ],
    contieneLeche: false,
    tostador: {
      localidad: "San Martín",
      nombre: "Tostado Norte",
      cuit: "30-66778899-0"
    }
  },
  {
    tipo: "espresso",
    ingredientes: ["vainilla", "canela"],
    peso: 260,
    intensidad: "media",
    precio: [
      { tipo: "efectivo", precio: 495 },
      { tipo: "tarjeta", precio: 545 }
    ],
    contieneLeche: true,
    tostador: {
      localidad: "Buenos Aires",
      nombre: "Capital Roast",
      cuit: "30-99887766-5"
    }
  },
  {
    tipo: "descafeinado",
    ingredientes: ["canela"],
    peso: 205,
    intensidad: "baja",
    precio: [
      { tipo: "efectivo", precio: 470 },
      { tipo: "tarjeta", precio: 515 }
    ],
    contieneLeche: true,
    tostador: {
      localidad: "La Plata",
      nombre: "LP Tostadores",
      cuit: "30-44332211-2"
    }
  },
  {
    tipo: "cold brew",
    ingredientes: ["vainilla", "chocolate", "whisky"],
    peso: 280,
    intensidad: "alta",
    precio: [
      { tipo: "efectivo", precio: 540 },
      { tipo: "tarjeta", precio: 590 }
    ],
    contieneLeche: false,
    tostador: {
      localidad: "San Rafael",
      nombre: "Montaña Coffee",
      cuit: "30-33445566-7"
    }
  }
])



//2) Buscar cuántos cafés contienen chocolate entre sus ingredientes.

db.cafes.find(
    {ingredientes:"chocolate"},
    {tipo:1,ingredientes:1,_id:0}
)


//3) Buscar cuántos cafés son de tipo “cold brew”· y contienen “vainilla” entre sus ingredientes.

db.cafes.find({tipo:"cold brew",ingredientes:"vainilla"}).count()

//4) Listar tipo y peso de los cafés que tienen una intensidad “media”.

db.cafes.find({intensidad:"media"},{tipo:1,peso:1,_id:0})

//5) Obtener tipo, peso e intensidad de los cafés cuyo peso se encuentre entre 200 y 260 inclusive.

db.cafes.find({peso:{$gte:200,$lte:260}},{tipo:1,peso:1,intensidad:1,_id:0})



//6) Mostrar los cafés que fueron tostados en localidades que contengan “san”, permitiendo buscar por “san” y que se muestren también los de “santos”, “san justo”, etc. Ordenar el resultado por peso de manera descendente.

db.cafes.aggregate([
    {$match:{"tostador.localidad":{$regex:/san/i}}},
    {$sort:{peso:-1}},
    {$project:{"tostador.localidad":1,_id:0}}
])

//7) Mostrar la sumar del peso de cada tipo de Café.

db.cafes.aggregate([{
    $group:{_id:"$tipo",pesoTotal:{$sum:"$peso"}}
}])


//8) Agregar el ingrediente “whisky” todos los cafés cuya intensidad es alta.

db.cafes.updateMany({intensidad:"alta" },{$addToSet:{ingrediente:"whisky"}})


//9) Sumarle 10 al peso de los cafés cuyo peso se encuentre entre 200 y 260 inclusive.

db.cafes.updateMany({peso:{$gte:200,$lte:260}},{$inc:{peso:10}})

//10) Eliminar los cafés cuyo peso sea menor o igual a 210.


db.cafes.deleteMany({peso:{$lte:210}})




