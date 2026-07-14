function Content() {
    return (
        <div className="grid grid-cols-4 gap-4 my-4 mx-20">
            <div className="col-span-1 w-full h-full bg-blue-500">
                sideBar
            </div>
            <div className="col-span-2 bg-green-500">
                posts
            </div>
            <div className="col-span-1 bg-red-500">
                trending
            </div>
        </div>
    )
}

export default Content