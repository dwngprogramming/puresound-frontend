import {Ellipsis} from "lucide-react";

const QueueTrack = () => {
  return (
    <div className="py-2 flex items-center space-x-3">
      <img
        width={44}
        height={44}
        src="https://images.squarespace-cdn.com/content/v1/5ee52f7d9edc8a7ee635591a/8df50655-6b68-460e-ad6c-5230001b9d5a/240404+-+063944+-+001.jpg"
        alt="Test Track"
        className="rounded-lg"
      />
      <div className="flex flex-1 items-center justify-between">
        <div className="flex flex-col space-y-1 justify-center">
          <p className="font-bold text-sm">Test Track</p>
          <p className="text-xs text-gray-400">Test Artist</p>
        </div>
        <Ellipsis size={22} className="relative cursor-pointer text-gray-300 hover:text-gray-100 hover:scale-105"/>
      </div>
    </div>
  );
}

export default QueueTrack;