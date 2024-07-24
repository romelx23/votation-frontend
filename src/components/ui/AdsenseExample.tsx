import { Adsense } from '@ctrl/react-adsense'

export const AdsenseExample = () => {
    return (
        <Adsense
            className='ExampleAdSlot'
            client="ca-pub-1234"
            slot="2222222"
            adTest='on' //Dev Only
        />
    )
}
