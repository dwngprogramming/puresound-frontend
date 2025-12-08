import {StreamInfoResponse} from "@/models/stream/StreamInfoResponse";
import streamApiClient from "@/libs/axios/streamApiClient";
import {ApiResponse} from "@/models/ApiResponse";

const streamApi = {
  verifyOrCreateSession: () =>
    streamApiClient.get<ApiResponse<void>>('v1/stream/session/token'),

  streamTrack: (bitrate: number, trackId: string) =>
    streamApiClient.get<ApiResponse<StreamInfoResponse>>(`v1/stream/${bitrate}/${trackId}`),
};

export default streamApi;
