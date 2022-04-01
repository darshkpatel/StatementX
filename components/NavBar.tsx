import Link from 'next/link'

const NavBar: React.FC = () => {
  return (
    <nav className="w-full bg-white px-8 text-gray-700">
      <div className="container mx-auto flex max-w-7xl flex-col flex-wrap items-center justify-between py-5 md:flex-row">
        <div className="relative flex flex-row space-x-4">
          <Link href="/">
            <a className="mb-5 flex items-center font-medium text-gray-900 md:mb-0 lg:w-auto lg:items-center lg:justify-center">
              <span className="mx-auto select-none text-xl font-black leading-none text-gray-900">
                Statement<span className="text-indigo-600">X</span>
              </span>
            </a>
          </Link>
          <nav className="mb-5 flex flex-wrap items-center text-base md:mb-0 md:ml-8 md:border-l md:border-gray-200 md:pl-8">
            <Link href="/">
              <a className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">
                Home
              </a>
            </Link>
            <Link href="/dash">
              <a className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">
                Dashboard
              </a>
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
