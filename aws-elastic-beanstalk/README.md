# AWS - Elastic Beanstalk

## AWS Educate
[Guia de registro](https://github.com/pablovilas/asp-course-examples/blob/master/2020/s2/s2c2/AWSEducate.md)

## Creacion de la base de datos:
[Creacion base RDS](RDS.md)

## Beanstalk

### Creando la aplicacion
![](img/1.png)
![](img/2.png)

### Creando el entorno 
![](img/3.png)

**Elegimos que es un servidor web y que la plataforma va a ser Docker**
![](img/4.png)
![](img/5.png)

### Subimos el código de la aplicación, en un zip. Podria ser un bucket del servicio S3 como alternativa. 
![](img/6.png)

### Clickeamos "Configurar mas opciones" IMPORTANTE
![](img/7.png)

### Elegimos que use una sola instancia (por ahora)
![](img/8.png)

### Clickeamos "Editar" en la caja de "Software"
![](img/9.png)

### Aqui podemos cambiar las variables de entorno. Vamos a hablar de eso cuando demos 12 Factor. Importante para configurar aspectos y configuraciones de nuestra app.
![](img/10.png)

### Creamos el entorno
![](img/11.png)
