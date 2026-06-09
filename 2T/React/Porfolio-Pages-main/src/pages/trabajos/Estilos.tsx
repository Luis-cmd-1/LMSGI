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
// Hay que importar el Link
import  { Link } from "react-router-dom"
import type { IServicios } from "@/model/interfaces/IServicios"
// esto es importate ya que los Props necesitan de una zona de la base de datos donde coger los estilos
interface Props {
    servicio: IServicios
}

export const Estilos = ({servicio}: Props) => {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 ">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={servicio.imagen}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>{servicio.titulo}</CardTitle>
        <CardDescription>
          A practical talk on component APIs, accessibility, and shipping
          faster.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        {/* Importante poner el link aqui para que usando el id del servicio*/}
        <Link to= {`/trabajos/${servicio.id}`} className="w-full">
        <Button className="w-full">View Event</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
