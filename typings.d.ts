
interface ICurrentProps {
    main: {
        temp: number;
    }
    name : string;
    dt_txt: number;
    weather: {
        main: string;
    }[];
    wind: {
        speed: number;
    }
}

interface IForecastProps{
    main: {
        temp: number;
    }
    name : string;
    dt_txt: number;
    weather: {
        main: string;
    }[];
    wind: {
        speed: number;
    }

}