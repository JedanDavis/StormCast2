import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterIcon from '@mui/icons-material/Water';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AirIcon from '@mui/icons-material/Air';
import React from 'react';

type Props = {
  icon: 'wind' | 'feels' | 'humidity' | 'visibility'
  title: string
  info: string | JSX.Element
  description?: string | JSX.Element
}

const icons = {
  wind: AirIcon,
  feels: ThermostatIcon,
  humidity: WaterIcon,
  visibility: VisibilityIcon,
}

const Tile = ({ icon, title, info, description }: Props): JSX.Element => {
  const Icon = icons[icon]

  return (
    <article className="w-[140px] h-[130px] hover:scale-110 transition duration-500 text-zinc-700 bg-white/20 backdrop-blur-ls rounded drop-shadow-lg p-2 mb-5 flex flex-col justify-between">
      <div className="flex items-center text-sm font-bold">
        <Icon /> <h4 className="ml-1">{title}</h4>
      </div>
      <h3 className="mt-2 text-lg">{info}</h3>

      <div className="text-xs font-bold">{description}</div>
    </article>
  )
}
export default Tile