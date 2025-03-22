'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { BurgerIcon, CloseIcon, Logo } from '../../utils/icons'
import { usePathname } from 'next/navigation'

const navItems = [
  {
    label: '_home',
    href: '/',
  },
  {
    label: '_projects',
    href: '/projects',
  },
  {
    label: '_services',
    href: '/#services',
  },
  {
    label: '_certifications',
    href: '/certifications',
  },
  {
    label: '_blog',
    href: '/blog',
  },
  {
    label: '_contact-me',
    href: '/#contact',
  },
]

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsVisible(!isVisible)
  }

  // Check if the current path matches the nav item
  const isActive = (href: string) => {
    if (href === '/') return pathname === href
    if (href.startsWith('/#')) return false
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 h-16 w-full border-b border-[#2B3E6E] bg-primary/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-4 py-1">
        {isVisible ? (
          <div className="md:hidden text-mint">_menu</div>
        ) : (
          <Link href="/">
            <div className="relative flex animate-fade-up items-center gap-3 transition-all duration-300 md:static">
              <Image src={Logo} alt="logo" className="h-8 w-10" />
              <span className="text-primary hover:text-mint transition-colors duration-300">jobayer arafat</span>
            </div>
          </Link>
        )}

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 focus:outline-none focus:ring-2 focus:ring-mint/30 rounded-md"
            aria-label={isVisible ? "Close menu" : "Open menu"}
          >
            {isVisible ? (
              <Image src={CloseIcon} alt="close-icon" className="transition-transform duration-300 hover:rotate-90" />
            ) : (
              <Image src={BurgerIcon} alt="menu-icon" className="transition-transform duration-300 hover:scale-110" />
            )}
          </button>
        </div>

        <ul
          className={`${
            isVisible ? 'flex animate-slide-in' : 'hidden'
          } absolute left-0 top-16 z-10 h-[calc(100vh-4rem)] w-full flex-col bg-primary md:static md:top-0 md:flex md:h-full md:w-auto md:flex-row md:items-center md:animate-none md:bg-transparent`}>
          {navItems.map(({ label, href }) => (
            <li
              key={href}
              onClick={() => setIsVisible(false)}
              className="flex items-center border-b border-[#2B3E6E]/50 px-5 text-xl md:border-y-0 md:border-e md:text-base md:first:border-s md:last:ml-auto md:last:border-none md:last:px-0 lg:px-8">
              <Link
                href={href}
                className={`relative w-full py-6 transition-all duration-200 hover:text-white md:py-4 ${
                  isActive(href)
                    ? 'text-white font-medium after:md:absolute after:md:bottom-0 after:md:left-0 after:md:w-full after:md:h-[2px] after:md:bg-mint'
                    : 'text-primary'
                }`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar