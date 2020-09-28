### Caching con CDN Cloudfront

#### Creamos el bucket de S3
![](tutorial-img/1.png)

#### Debe tener permisos para ser accedido publicamente ya que es una web
![](tutorial-img/2.png)`

#### Una vez creado el bucket, vamos al mismo, y configuramos que sea una web
![](tutorial-img/3.png)
![](tutorial-img/4.png)

#### Subimos nuestros archivos, con permisos de ser accedidos publicamente
![](tutorial-img/5.png)
![](tutorial-img/6.png)

#### Creamos la distribucion de CloudFront
![](tutorial-img/7.png)
![](tutorial-img/8.png)
![](tutorial-img/9.png)


#### Tenemos nuestra distribucion creada, demorara un rato en crearse, y tendra una url como por ejemplo
`https://d1x55uk8dsnqot.cloudfront.net/index.html`

### Si queremos invalidar el cache, debemos crear una invalidacion:
https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html
