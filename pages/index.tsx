import type { NextPage } from 'next'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    
<section className="w-full antialiased bg-white">
    <div className="px-8">
        <div className="container  px-4 py-32 mx-auto text-left md:max-w-none md:text-center">
            <h1 className="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 md:text-center sm:leading-none md:text-6xl lg:text-7xl flex flex-col">
              <span className="relative text-5xl mt-2 text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500 md:inline-block">
                Statement<span className="text-black font-bold">X</span>
                </span>
                <span className="inline md:block text-4xl">Statements, Simplified</span> 

                </h1>
            <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg md:text-center lg:text-lg">Parse those pesky bank statements with a click, Export them to a clean CSV file</div>
            <div className="flex flex-col items-center mt-12 text-center">
                <span className="relative inline-flex w-full md:w-auto">
                    <a href="#_" type="button" className="inline-flex items-center justify-center w-full px-6 py-2 text-base font-bold leading-6 text-white bg-indigo-600 border border-transparent rounded-full md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                        Get Started
                    </a>
                </span>
            </div>
        </div>
    </div>
    <div  className={"hidden md:block w-1/3 h-1/3 absolute bottom-0 right-10"}>
    <Image src={"/payments.svg"} layout={"fill"} />
    </div>
</section>

  )
}

export default Home
