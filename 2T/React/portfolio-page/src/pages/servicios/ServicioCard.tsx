import type { IServicio } from "@/model/interfaces/IServicio";
import { Link } from "react-router-dom"; // Para abrir los detalle de servicios

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Props {
    servicio: IServicio;
}

export const ServicioCard = ({ servicio }: Props) => {
  return ( 
    //Importante el Link Para q funcione
    <Link to={`/servicios/${servicio.id}`} className="cursor-pointer"> 
      <Card className="relative mx-auto w-full max-w-sm pt-0 hover:shadow-lg transition-shadow">
        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
        <img
          src={servicio.imagen}
          alt="Event cover"
          className="relative z-20 aspect-video w-full object-cover"
        />
        <CardHeader>
          <CardAction>
            <Badge variant="secondary">Featured</Badge>
          </CardAction>
          <CardTitle>{servicio.titulo}</CardTitle>
          <CardDescription>
            {servicio.descripcion1}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full">Ver detalle</Button>
        </CardFooter>
      </Card>
    </Link>
  )
}