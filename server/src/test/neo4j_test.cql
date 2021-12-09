CREATE( chef1:Chef { nickname: 'chef1', nombre: 'Chef 1', contrasenia: '111', genero:'Hombre', celular: '1111111', valoracion: 0, clasificacion:'' } )
CREATE( chef2:Chef { nickname: 'chef2', nombre: 'Chef 2', contrasenia: '222', genero:'Hombre', celular: '2222222', valoracion: 0, clasificacion:'' } )
CREATE( chef3:Chef { nickname: 'chef3', nombre: 'Chef 3', contrasenia: '333', genero:'Hombre', celular: '3333333', valoracion: 0, clasificacion:'' } )
CREATE( chef4:Chef { nickname: 'chef4', nombre: 'Chef 4', contrasenia: '444', genero:'Hombre', celular: '4444444', valoracion: 0, clasificacion:'' } )
CREATE( chef5:Chef { nickname: 'chef5', nombre: 'Chef 5', contrasenia: '555', genero:'Hombre', celular: '5555555', valoracion: 0, clasificacion:'' } )

CREATE( publicacion1:Publicacion { titulo: 'receta1', duracion: '1:00min', fecha: date({year: 2020, month: 5, day: 1}), descripcion:'Inserte descripcion de receta1', valoracion:0} )
CREATE( publicacion2:Publicacion { titulo: 'receta2', duracion: '2:00min', fecha: date({year: 2020, month: 5, day: 2}), descripcion:'Inserte descripcion de receta2', valoracion:0} )
CREATE( publicacion3:Publicacion { titulo: 'receta3', duracion: '3:00min', fecha: date({year: 2020, month: 5, day: 3}), descripcion:'Inserte descripcion de receta3', valoracion:0} )
CREATE( publicacion4:Publicacion { titulo: 'receta4', duracion: '4:00min', fecha: date("2020-05-03"), descripcion:'Inserte descripcion de receta4', valoracion:0} )

CREATE 
(chef1)-[:PUBLICA]->(publicacion1),
(chef2)-[:PUBLICA]->(publicacion2),
(chef3)-[:PUBLICA]->(publicacion3),
(chef4)-[:PUBLICA]->(publicacion4);

MATCH (ch1:Chef) where ID(ch1)=$idUsuario
MATCH (pub1:Publicacion) where ID(pub1)=$idPublicacion
CREATE (ch1)-[:PUBLICA]->(pub1) return pub1;

MATCH (n) detach DELETE n;

CREATE(pais1:Pais{nombre:'Colombia'}) return pais1, ID(pais1) as id;
CREATE(pais1:Pais{nombre:'Peru'}) return pais1, ID(pais1) as id;
CREATE(pais1:Pais{nombre:'Chile'}) return pais1, ID(pais1) as id;
CREATE(pais1:Pais{nombre:'Argentina'}) return pais1, ID(pais1) as id;
CREATE(pais1:Pais{nombre:'Bolivia'}) return pais1, ID(pais1) as id;
CREATE(pais1:Pais{nombre:'Uruguay'}) return pais1, ID(pais1) as id;


MATCH (chef1:Chef) where ID(chef1)=0
MATCH (chef2:Chef) where ID(chef2)=1
CREATE (chef1)-[:Sigue]->(chef2) return chef2;

MATCH (pais:Pais) where ID(pais)=41
MATCH (p1:Publicacion) where ID(p1)=21
CREATE (pais)-[o:ORIGEN]->(p1) return o;


MATCH (c:Chef) WHERE ID(c)=13    
MATCH (c)-[:SIGUE]->(chefs:Chef)
MATCH (chefs)-[:PUBLICA]->(pubs:Publicacion)
RETURN pubs
ORDER BY pubs.fecha, ID(pubs);