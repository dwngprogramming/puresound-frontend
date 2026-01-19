import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {setQueueCurrentTab} from "@/libs/redux/features/right-sidebar-control/rightSidebarControlSlice";

const QueueOptionButton = () => {
  const currentTab = useAppSelector((state) => state.rightSidebarControl.queue.currentTab);
  const dispatch = useAppDispatch();
  
  return (
    <div className="flex items-center mb-4 text-sm font-bold">
      <button
        className="px-3 py-3 cursor-pointer hover:bg-gray-700"
        onClick={() => dispatch(setQueueCurrentTab('queue'))}
      >
        <div className="relative">
          Queue
          {currentTab === 'queue' &&
              <div className="absolute -bottom-1.25 w-full h-1 bg-blue-400/80 rounded-full"></div>}
        </div>
      </button>
      <button
        className="px-3 py-3 cursor-pointer hover:bg-gray-700"
        onClick={() => dispatch(setQueueCurrentTab('recentlyPlayed'))}
      >
        <div className="relative">
          Recently Played
          {currentTab === 'recentlyPlayed' &&
              <div className="absolute -bottom-1.25 w-full h-1 bg-blue-400/80 rounded-full"></div>}
        </div>
      </button>
    </div>
  );
}

export default QueueOptionButton;