import Image from 'next/image'
import Link from 'next/link'

const navIcons = [
  { src: '/assets/icons/dark-mode.svg', alt: 'darkmode' },
  { src: '/assets/icons/about-filled.svg', alt: 'about' },
]

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
          {navIcons.map((icon) => (
            <Image
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              width={28}
              height={28}
              className="object-contain"
            />
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar