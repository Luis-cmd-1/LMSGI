
// QSomos es = arrow funcion ES6
export default function Home() {
  return (
    <div id="qsomos" className="bg-slate-950 py-24 sm:py-32 min-h-screen flex items-center justify-center">
      <div className="flex-col md:flex-row items-center justify-center flex text-center px-6 lg:text-left gap-10">
        {/* flex-col lo que hace es que el contenedor ahora es una columna, el lg:flex-row cuado llega al tamaño largo lso elementos vuelven a su sitio; text-center lg:text-left
        esto lo que hace es centrar el texto y volver a la normalidad con el lg-; el px es un padding lateral*/}
        <div className="max-w-xl flex flex-col justify-between ">
          <h2 className="text-3xl flex font-semibold tracking-tight text-pretty text-white sm:text-4xl ">
            Guillem Rodríguez Martínez
          </h2>
          <p className="mt-6 text-lg/8 text-gray-400">
            Freeland que se dedica a la paginación web profesional. Utilizo todo tipo de lenguages de programación, los más utilizados son React, HTML, CSS y JS.
          </p>
        </div>
        <img alt="Imagen de un informatico sentado" src="/Informatico.png" className="w-full max-w-xs lg:max-w-md h-auto objet-contrain"></img>
        {/*w-full max-w-xs lg:max-w-md esto lo que hace es que la imagen no se coma la pantalla en el mobil y el h-aut mantiene la proporcion automaticamente */}
      </div>
    </div>
  )
}