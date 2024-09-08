import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className='w-full'>
      <nav className='nav'>
        <Link href={"/"} className='flex items-center gap-1'>
          <p className="nav-logo">
            Apt<span className='text-blue-500'>Buy</span>
          </p>
        </Link>
        <div className="flex items-center gap-5">
          <Image
            src={'/assets/icons/dark-mode.svg'}
            alt='theme'
            width={28}
            height={28}
            className="object-contain"
          />
          <Link
            href={'/about'}
          >
            <Image
              src={'/assets/icons/about-filled.svg'}
              alt='theme'
              width={28}
              height={28}
              className="object-contain"
            />
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar