function Header() {
    return (
        <header className="grid grid-cols-3 gap-4 p-4 border-b border-gray-300 shadow-md sticky top-0 bg-white z-10 shrink-0">
            <div className="col-span-1">
                <h1 className="font-pixel font-bold text-2xl">My Blog</h1>
                <p className="text-gray-500">Nơi chia sẻ kiến thức và kinh nghiệm</p>
            </div>
            <div className="col-span-1">
                <input className="w-full h-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5" type="text" placeholder="Tìm kiếm..." />
            </div>
            <div className="col-span-1 flex justify-end items-center gap-4">
                <button className="p-2 rounded-full hover:bg-gray-100 hover:transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg cursor-pointer" title="Chế độ tối">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#424242">
                        <path d="M380-160q133 0 226.5-93.5T700-480q0-133-93.5-226.5T380-800h-21q-10 0-19 2 57 66 88.5 147.5T460-480q0 89-31.5 170.5T340-162q9 2 19 2h21Zm0 80q-53 0-103.5-13.5T180-134q93-54 146.5-146T380-480q0-108-53.5-200T180-826q46-27 96.5-40.5T380-880q83 0 156 31.5T663-763q54 54 85.5 127T780-480q0 83-31.5 156T663-197q-54 54-127 85.5T380-80Zm80-400Z" />
                    </svg>
                </button>
                <button className="w-fit h-fit rounded-full border border-gray-300 bg-blue-500 px-4 py-2 text-white font-medium hover:bg-blue-900 hover:transition-all duration-200 hover:-translate-y-1.5 hover:underline cursor-pointer hover:shadow-lg">Đăng nhập/Đăng ký</button>
            </div>
        </header>
    )
}

export default Header   