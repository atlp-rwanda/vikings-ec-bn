const basicInfo = {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      description: "Ecommerce api docs",
      version: "1.0.0",
    },

    schemes: ['HTTP', 'HTTPS'],

    components:{
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },   
} 

export default basicInfo 