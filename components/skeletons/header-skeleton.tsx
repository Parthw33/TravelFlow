export const HeaderSkeleton = () => (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div className="items-center hidden space-x-8 md:flex">
          <ul className="nav-ul header-ul">
            <li className="flex-auto w-32 h-6 bg-gray-300 rounded animate-pulse"></li>
            <li className="flex-auto w-32 h-6 bg-gray-300 rounded animate-pulse"></li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </nav>
  );
  