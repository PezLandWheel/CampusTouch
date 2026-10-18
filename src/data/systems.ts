import { CalendarDays, FileCheck2, GraduationCap, Newspaper, Users } from 'lucide-react';
export const menuOptions = [
 {title:'Noticias',subtitle:'Últimas noticias de la carrera',icon:Newspaper,tone:'blue',path:'noticias'},
 {title:'Horarios de Semestres',subtitle:'Consulta los horarios académicos',icon:CalendarDays,tone:'violet',path:'horarios'},
 {title:'Horarios de Profesores',subtitle:'Horarios de clase, atención y asesorías',icon:Users,tone:'cyan',path:'profesores'},
 {title:'Permisos',subtitle:'Accede al portal oficial de la Universidad',icon:FileCheck2,tone:'green',path:'permisos',externalUrl:'https://gpingsis-permisos.fnroseror.workers.dev/login'},
 {title:'Estudiantes',subtitle:'Inicia sesión para ver tu información',icon:GraduationCap,tone:'blue',path:'estudiantes',externalUrl:'https://fenix.umariana.edu.co/sgacampus/'},
] as const;
export const slides = [
 {title:'Desarrollando talento para un mundo digital',image:'/images/systems-lab.png'},
 {title:'Innovación para la sociedad',image:'/images/campus-engineering.png'},
 {title:'Tecnología que transforma',image:'/images/systems-lab.png'},
 {title:'Ideas que construyen futuro',image:'/images/campus-engineering.png'},
] as const;
