import ScaleLoader from 'react-spinners/ScaleLoader'

export default function Loading() {
    return <div className='flex items-center justify-center w-full h-full m-5'>
        <ScaleLoader color={'#d90429'} loading={true} />
    </div>
}
