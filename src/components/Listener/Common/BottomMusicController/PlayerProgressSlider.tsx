// Separated from BottomMusicController to reduce re-renders
import {formatDuration} from "@/utils/formatDuration";
import {usePlayerContext} from "@/context/player-control-context";
import {useEffect, useState} from "react";
import {Slider} from "@heroui/react";

const PlayerProgressSlider = () => {
  const { currentTime, duration, seek } = usePlayerContext();
  
  // Local State cho Slider (Để tránh xung đột khi người dùng đang kéo thanh trượt)
  const [sliderValue, setSliderValue] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // Sync slider với currentTime (chỉ khi user KHÔNG đang kéo)
  useEffect(() => {
    if (!isDragging) {
      setSliderValue(currentTime);
    }
  }, [currentTime, isDragging]);
  
  const onSeekChange = (value: number | number[]) => {
    setIsDragging(true);
    setSliderValue(Number(value));
  };
  
  const onSeekEnd = (value: number | number[]) => {
    setIsDragging(false);
    seek(Number(value));
  };
  
  return (
    <div className="min-w-[400px] w-full">
      <Slider
        aria-label="Playback progress"
        size="sm"
        // Dùng local state sliderValue thay vì currentTime trực tiếp để mượt mà khi kéo
        value={sliderValue}
        minValue={0}
        maxValue={duration || 100} // Tránh lỗi chia cho 0 hoặc max=0
        step={0.01}
        onChange={onSeekChange}    // Đang kéo
        onChangeEnd={onSeekEnd}    // Thả ra
        
        // Custom styles (Giữ nguyên style của bạn)
        classNames={{
          track: `group cursor-pointer border-x-5 m-0 h-[6px]
            data-[fill-start=true]:border-s-blue-400 hover:data-[fill-start=true]:border-s-blue-300
            data-[fill-end=true]:border-e-blue-400 hover:data-[fill-end=true]:border-e-blue-300`,
          filler: `bg-blue-400 group-hover:bg-blue-300 rounded-r-full group-data-[fill-end=true]:rounded-r-none`,
        }}
        startContent={<p className="text-xs text-gray-400 w-8 text-right mr-2">{formatDuration(sliderValue)}</p>}
        endContent={<p className="text-xs text-gray-400 w-8 ml-2">{formatDuration(duration)}</p>}
        renderThumb={(props) => (
          <div
            {...props}
            className="top-1/2 w-3.5 h-3.5 rounded-full bg-white transition-opacity opacity-0 group-hover:opacity-100"
          />
        )}
      />
    </div>
  )
}

export default PlayerProgressSlider;