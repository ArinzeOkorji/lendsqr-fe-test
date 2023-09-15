import './card.scss';

export interface cardData {
    color: string,
    title: string,
    icon: string,
    value: number
}
export function Card({data}: {data: cardData}) {
    
    return <>
    <div className='bg-white card-item'>
        <div className="d-flex flex-column">
            <div className={`${data.color} d-flex align-items-center justify-content-center icon-container rounded-circle`}>
                <img src={`/src/assets/icons/${data.icon}.svg`} alt="" />
            </div>
            <div className="text-color-2 fw-500 fs-14 text-uppercase title">{data.title}</div>
            <div className="text-color-1 fw-600 fs-24 value">{data.value}</div>
        </div>
    </div>
    </>
}