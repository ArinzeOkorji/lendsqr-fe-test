export function ErrorPage({message = 'User'}: {message?: string}) {
    return <>
    <div className="h-100 pb-4">
        <div className="d-flex flex-column justify-content-center h-100 align-items-center text-center">
            <h2 className='text-color-1'>Uh-Oh!</h2>
            <div className='text-color-2 mt-2'>Looks like you are out of scope. <br /> Click the <b>{message}</b> menu item to continue</div>
        </div>
    </div>
    </>
}