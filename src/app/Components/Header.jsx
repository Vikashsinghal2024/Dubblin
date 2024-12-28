

"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Search, User, ShoppingCart, Menu, X, ChevronRight, ChevronDown } from 'lucide-react';

const createDynamicNavigation = (config) => {
  return config.map(({ title, href, sections }) => ({
    title,
    href,
    sections: sections.map(({ sectionTitle, links }) => ({
      title: sectionTitle,
      links: links.map(({ linkTitle, linkHref }) => ({
        title: linkTitle,
        href: linkHref,
      })),
    })),
  }));
};

// Example Configuration for Customizable Navigation
const navigationConfig = [
  {
    title: 'Home',
    href: '/',
    sections: [
      {
        sectionTitle: 'Category 1',
        links: [
          { linkTitle: 'Overview', linkHref: '/category-1/overview' },
          { linkTitle: 'Details', linkHref: '/category-1/details' },
        ],
      },
      {
        sectionTitle: 'Category 2',
        links: [
          { linkTitle: 'Link A', linkHref: '/category-2/link-a' },
          { linkTitle: 'Link B', linkHref: '/category-2/link-b' },
        ],
      },
      {
        sectionTitle: 'Category 3',
        links: [
          { linkTitle: 'Link C', linkHref: '/category-3/link-c' },
          { linkTitle: 'Link D', linkHref: '/category-3/link-d' },
        ]
      },
      {
        sectionTitle: 'Category 4',
        links: [
          { linkTitle: 'Link E', linkHref: '/category-4/link-e' },
          { linkTitle: 'Link F', linkHref: '/category-4/link-f' },
          ],
      }
    ],
  },
  {
    title: 'About us',
    href: '/about',
    sections: [
      {
        sectionTitle: 'Our Mission',
        links: [
          { linkTitle: 'Vision', linkHref: '/about/mission/vision' },
          { linkTitle: 'Team', linkHref: '/about/mission/team' },
        ],
      },
      {
        sectionTitle: 'Our Team',
        links: [
          { linkTitle: 'Meet the Team', linkHref: '/about/team/meet-the-team' },
          { linkTitle: 'Team Members', linkHref: '/about/team/team-members' },
          ],
      },
      {
        sectionTitle: 'Our History',
        links: [
          { linkTitle: 'Our Story', linkHref: '/about/history/our-story' },
          { linkTitle: 'Timeline', linkHref: '/about/history/timeline' },
          ],
      },
      {
        sectionTitle: 'Contact Us',
        links: [
          { linkTitle: 'Contact Form', linkHref: '/contact' },
          { linkTitle: 'Email', linkHref: '/contact/email' },
          ],
      }
    ],
  },
  {
    title: 'Blog',
    href: '/blog',
    sections: [
      {
        sectionTitle: 'Latest Posts',
        links: [
          { linkTitle: 'Post 1', linkHref: '/blog/post-1' },
          { linkTitle: 'Post 2', linkHref: '/blog/post-2' },
        ],
      },
      {
        sectionTitle: 'Categories',
        links: [
          { linkTitle: 'Category 1', linkHref: '/blog/categories/category-1'},
          { linkTitle: 'Category 2', linkHref: '/blog/categories/category-2'},
          ],
      },
        {
          sectionTitle: 'Tags',
          links: [
            { linkTitle: 'Tag 1', linkHref: '/blog/tags/tag-1'},
            { linkTitle: 'Tag 2', linkHref: '/blog/tags/tag-2'},
            ],
        },
          {
            sectionTitle: 'Archives',
            links: [
              { linkTitle: 'Archive 1', linkHref: '/blog/archives/archive-1'},
              { linkTitle: 'Archive 2', linkHref: '/blog/archives/archive-2'},
              ],
          }
    ],
  },
  {
    title: 'Accessories',
    href: '/accessories',
    sections: [
      {
        sectionTitle: 'Summer Collection',
        links: [
          { linkTitle: 'Hats', linkHref: '/accessories/summer/hats' },
          { linkTitle: 'Sunglasses', linkHref: '/accessories/summer/sunglasses' },
        ],
      },
      {
        sectionTitle: 'Winter Collection',
        links: [
          { linkTitle: 'Scarves', linkHref: '/accessories/winter/scarves'},
          { linkTitle: 'Gloves', linkHref: '/accessories/winter/gloves'},
          ],
      }
    ],
  },
  {
    title: 'New Arrivals',
    href: '/new-arrivals',
    sections: [
      {
        sectionTitle: 'Spring 2024',
        links: [
          { linkTitle: 'Dresses', linkHref: '/new-arrivals/spring/dresses' },
          { linkTitle: 'Shoes', linkHref: '/new-arrivals/spring/shoes' },
        ],
      },
    ],
  },
  {
    title: 'Sale',
    href: '/sale',
    sections: [
      {
        sectionTitle: 'Deals of the Day',
        links: [
          { linkTitle: 'Electronics', linkHref: '/sale/deals/electronics' },
          { linkTitle: 'Furniture', linkHref: '/sale/deals/furniture' },
        ],
      },
    ],
  },
];

// Generate the Navigation Dynamically
const navigation = createDynamicNavigation(navigationConfig);

console.log(navigation);


export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setActiveMobileDropdown(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveMobileDropdown(null);
  };

  const toggleMobileDropdown = (title) => {
    setActiveMobileDropdown(activeMobileDropdown === title ? null : title);
  };

  return (
    <header className="relative font-Outfit">
      <div className="font-Outfit text-center py-4 bg-black text-white">
        <h1>Free Shipping On Orders Over $25</h1>
      </div>
      <nav className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between lg:justify-start lg:space-x-8">
            <div className="hidden lg:flex ml-52 lg:items-center lg:space-x-8">
              {navigation.slice(0, 4).map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  // onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center"
                    onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title)}
                  >
                    {item.title}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex lg:flex-1 lg:justify-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/Logo.png"
                  alt="Dubblin Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            <div className="flex items-center space-x-8">
              <div className="hidden lg:flex mr-52 lg:items-center lg:space-x-8">
                {navigation.slice(4).map((item) => (
                  <div
                    key={item.title}
                    className="relative"
                    // onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center"
                      onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title)}
                    >
                      {item.title}
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                {[Search, User, ShoppingCart].map((Icon, idx) => (
                  <button key={idx} className="text-gray-700 hover:text-gray-900">
                    <Icon className="h-5 w-5" />
                  </button>
                ))}
                <button
                  className="lg:hidden text-gray-700 hover:text-gray-900"
                  onClick={toggleMobileMenu}
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {activeDropdown && (
        <div
          className="absolute left-0 w-screen bg-white shadow-lg z-50 hidden lg:block"
          onMouseEnter={() => setActiveDropdown(activeDropdown)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-5 gap-8">
              {navigation.find((item) => item.title === activeDropdown)?.sections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="font-medium text-gray-900">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link
                          href={link.href}
                          className="text-sm text-gray-600 hover:text-gray-900"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <Image
            src="/Logo.png"
            alt="Dubblin Logo"
            width={100}
            height={33}
            className="h-8 w-auto"
          />
          <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-gray-900">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="overflow-y-auto h-full pb-20">
          {navigation.map((item) => (
            <div key={item.title} className="border-b">
              <button
                onClick={() => toggleMobileDropdown(item.title)}
                className="flex justify-between items-center w-full p-4 text-left text-gray-700 hover:text-gray-900"
              >
                {item.title}
                <ChevronRight
                  className={`h-5 w-5 transform transition-transform ${
                    activeMobileDropdown === item.title ? 'rotate-90' : ''
                  }`}
                />
              </button>
              {activeMobileDropdown === item.title && (
                <div className="bg-gray-50 p-4 ">
                  {item.sections.map((section, idx) => (
                    <div key={idx} className="mb-4">
                      <h3 className="font-medium text-gray-900 mb-2">{section.title}</h3>
                      <ul className="space-y-2">
                        {section.links.map((link, linkIdx) => (
                          <li key={linkIdx}>
                            <Link
                              href={link.href}
                              className="text-sm text-gray-600 hover:text-gray-900"
                              onClick={toggleMobileMenu}
                            >
                              {link.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}