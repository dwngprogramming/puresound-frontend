import {useTranslations} from "next-intl";
import Link from "next/link";
import MediaCard from "@/components/Listener/Common/MusicComponent/MediaCard";
import {SimplifiedTrackResponse} from "@/models/metadata/track/SimplifiedTrackResponse";
import {AlbumType} from "@/const/metadata/AlbumType";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useMediaHorizontalScroll} from "@/hooks/util/useMediaHorizontalScroll";
import {useEffect, useState} from "react";

interface SectionInfo {
  title: string;
  numOfItems: number;
}

const MediaSection = ({title, numOfItems}: SectionInfo) => {
  const t = useTranslations('Listener.Home.media');
  const [tracks, setTracks] = useState<SimplifiedTrackResponse[]>([]);
  const {
    scrollRef,
    showLeft,
    showRight,
    scrollLeft,
    scrollRight
  } = useMediaHorizontalScroll([tracks]);
  
  useEffect(() => {
    // Giả lập fetch dữ liệu track
    const fetchTracks = async () => {
      // Thay thế đoạn này bằng API thực tế để lấy dữ liệu track
      const trackTest: SimplifiedTrackResponse[] = [
        {
          id: "1",
          title: "Sample Track 1",
          explicit: false,
          artists: [
            {
              id: "a1",
              stageName: "Sample Artist 1"
            },
            {
              id: "a2",
              stageName: "Sample Artist 2"
            },
            {
              id: "a3",
              stageName: "Sample Artist 3"
            },
            {
              id: "a4",
              stageName: "Sample Artist 4"
            }
          ],
          album: {
            id: "al1",
            name: "Sample Album",
            albumType: AlbumType.ALBUM,
            releaseDate: "2024-01-01",
            artists: [
              {
                id: "a1",
                stageName: "Sample Artist"
              }
            ],
          }
        },
        {
          id: "2",
          title: "Sample Track 2",
          explicit: false,
          artists: [
            {
              id: "a1",
              stageName: "Sample Artist 1"
            },
            {
              id: "a2",
              stageName: "Sample Artist 2"
            },
            {
              id: "a3",
              stageName: "Sample Artist 3"
            },
            {
              id: "a4",
              stageName: "Sample Artist 4"
            }
          ],
          album: {
            id: "al1",
            name: "Sample Album",
            albumType: AlbumType.ALBUM,
            releaseDate: "2024-01-01",
            artists: [
              {
                id: "a1",
                stageName: "Sample Artist"
              }
            ],
          }
        },
        {
          id: "3",
          title: "Sample Track 3",
          explicit: false,
          artists: [
            {
              id: "a1",
              stageName: "Sample Artist 1"
            },
            {
              id: "a2",
              stageName: "Sample Artist 2"
            },
            {
              id: "a3",
              stageName: "Sample Artist 3"
            },
            {
              id: "a4",
              stageName: "Sample Artist 4"
            }
          ],
          album: {
            id: "al1",
            name: "Sample Album",
            albumType: AlbumType.ALBUM,
            releaseDate: "2024-01-01",
            artists: [
              {
                id: "a1",
                stageName: "Sample Artist"
              }
            ],
          }
        },
        {
          id: "4",
          title: "Sample Track 4",
          explicit: false,
          artists: [
            {
              id: "a1",
              stageName: "Sample Artist 1"
            },
            {
              id: "a2",
              stageName: "Sample Artist 2"
            },
            {
              id: "a3",
              stageName: "Sample Artist 3"
            },
            {
              id: "a4",
              stageName: "Sample Artist 4"
            }
          ],
          album: {
            id: "al1",
            name: "Sample Album",
            albumType: AlbumType.ALBUM,
            releaseDate: "2024-01-01",
            artists: [
              {
                id: "a1",
                stageName: "Sample Artist"
              }
            ],
          }
        },
        {
          id: "5",
          title: "Sample Track ",
          explicit: false,
          artists: [
            {
              id: "a1",
              stageName: "Sample Artist 1"
            },
            {
              id: "a2",
              stageName: "Sample Artist 2"
            },
            {
              id: "a3",
              stageName: "Sample Artist 3"
            },
            {
              id: "a4",
              stageName: "Sample Artist 4"
            }
          ],
          album: {
            id: "al1",
            name: "Sample Album",
            albumType: AlbumType.ALBUM,
            releaseDate: "2024-01-01",
            artists: [
              {
                id: "a1",
                stageName: "Sample Artist"
              }
            ],
          }
        },
        {
          id: "6",
          title: "Sample Track 6",
          explicit: false,
          artists: [
            {
              id: "a1",
              stageName: "Sample Artist 1"
            },
            {
              id: "a2",
              stageName: "Sample Artist 2"
            },
            {
              id: "a3",
              stageName: "Sample Artist 3"
            },
            {
              id: "a4",
              stageName: "Sample Artist 4"
            }
          ],
          album: {
            id: "al1",
            name: "Sample Album",
            albumType: AlbumType.ALBUM,
            releaseDate: "2024-01-01",
            artists: [
              {
                id: "a1",
                stageName: "Sample Artist"
              }
            ],
          }
        },
        {
          id: "7",
          title: "Sample Track 7",
          explicit: false,
          artists: [
            {
              id: "a1",
              stageName: "Sample Artist 1"
            },
            {
              id: "a2",
              stageName: "Sample Artist 2"
            },
            {
              id: "a3",
              stageName: "Sample Artist 3"
            },
            {
              id: "a4",
              stageName: "Sample Artist 4"
            }
          ],
          album: {
            id: "al1",
            name: "Sample Album",
            albumType: AlbumType.ALBUM,
            releaseDate: "2024-01-01",
            artists: [
              {
                id: "a1",
                stageName: "Sample Artist"
              }
            ],
          }
        },
        {
          id: "8",
          title: "Sample Track 8",
          explicit: false,
          artists: [
            {
              id: "a1",
              stageName: "Sample Artist 1"
            },
            {
              id: "a2",
              stageName: "Sample Artist 2"
            },
            {
              id: "a3",
              stageName: "Sample Artist 3"
            },
            {
              id: "a4",
              stageName: "Sample Artist 4"
            }
          ],
          album: {
            id: "al1",
            name: "Sample Album",
            albumType: AlbumType.ALBUM,
            releaseDate: "2024-01-01",
            artists: [
              {
                id: "a1",
                stageName: "Sample Artist"
              }
            ],
          }
        },
        {
          id: "9",
          title: "Sample Track 9",
          explicit: false,
          artists: [
            {
              id: "a1",
              stageName: "Sample Artist 1"
            },
            {
              id: "a2",
              stageName: "Sample Artist 2"
            },
            {
              id: "a3",
              stageName: "Sample Artist 3"
            },
            {
              id: "a4",
              stageName: "Sample Artist 4"
            }
          ],
          album: {
            id: "al1",
            name: "Sample Album",
            albumType: AlbumType.ALBUM,
            releaseDate: "2024-01-01",
            artists: [
              {
                id: "a1",
                stageName: "Sample Artist"
              }
            ],
          }
        },
        {
          id: "10",
          title: "Sample Track 10",
          explicit: false,
          artists: [
            {
              id: "a1",
              stageName: "Sample Artist 1"
            },
            {
              id: "a2",
              stageName: "Sample Artist 2"
            },
            {
              id: "a3",
              stageName: "Sample Artist 3"
            },
            {
              id: "a4",
              stageName: "Sample Artist 4"
            }
          ],
          album: {
            id: "al1",
            name: "Sample Album",
            albumType: AlbumType.ALBUM,
            releaseDate: "2024-01-01",
            artists: [
              {
                id: "a1",
                stageName: "Sample Artist"
              }
            ],
          }
        }
      ];
      setTracks(trackTest);
    };
    
    fetchTracks();
  }, []);
  
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h3>{title}</h3>
        <Link href="#" className="text-sm text-gray-400 hover:underline">
          {t('seeMore')}
        </Link>
      </div>
      <div className="relative">
        {showLeft && (
          <div
            className="absolute left-0 top-0 z-100 w-30 h-full bg-gradient-to-r from-blue-900/20 to-transparent flex items-center justify-start">
            <button
              className="rounded-full p-1 ml-3 transition ease-in-out duration-300 bg-neutral-800 hover:bg-neutral-500 cursor-pointer"
              onClick={scrollLeft}
            >
              <ChevronLeft size={20}/>
            </button>
          </div>
        )}
        
        <div
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar scroll-smooth"
        >
          {tracks.slice(0, numOfItems).map((track) => (
            <MediaCard
              key={track.id}
              track={track}
            />
          ))}
        </div>
        
        {showRight && (
          <div
            className="absolute right-0 top-0 z-100 w-30 h-full bg-gradient-to-r from-transparent to-blue-900/20 flex items-center justify-end">
            <button
              className="rounded-full p-1 mr-3 transition ease-in-out duration-300 bg-neutral-800 hover:bg-neutral-500 cursor-pointer"
              onClick={scrollRight}
            >
              <ChevronRight size={20}/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MediaSection;