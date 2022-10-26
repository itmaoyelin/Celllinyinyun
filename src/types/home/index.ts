export interface Sheet {
	id: number;
	type: number;
	name: string;
	copywriter: string;
	picUrl: string;
	canDislike: boolean;
	trackNumberUpdateTime: number;
	playCount: number;
	trackCount: number;
	highQuality: boolean;
	alg: string;
}
export interface Songs {
  id: number;
  type: number;
  name: string;
  copywriter?: any;
  picUrl: string;
  canDislike: boolean;
  trackNumberUpdateTime?: any;
  song: Song;
  alg: string;
}

interface Song {
  name: string;
  id: number;
  position: number;
  alias: string[];
  status: number;
  fee: number;
  copyrightId: number;
  disc: string;
  no: number;
  artists: Artist[];
  album: Album;
  starred: boolean;
  popularity: number;
  score: number;
  starredNum: number;
  duration: number;
  playedNum: number;
  dayPlays: number;
  hearTime: number;
  sqMusic?: SqMusic;
  hrMusic?: SqMusic;
  ringtone: string;
  crbt?: any;
  audition?: any;
  copyFrom: string;
  commentThreadId: string;
  rtUrl?: any;
  ftype: number;
  rtUrls: any[];
  copyright: number;
  transName?: string;
  sign?: any;
  mark: number;
  originCoverType: number;
  originSongSimpleData?: OriginSongSimpleDatum;
  single: number;
  noCopyrightRcmd?: any;
  rtype: number;
  rurl?: any;
  mvid: number;
  bMusic: SqMusic;
  mp3Url?: any;
  hMusic: SqMusic;
  mMusic: SqMusic;
  lMusic: SqMusic;
  exclusive: boolean;
  privilege: Privilege;
  transNames?: string[];
}

interface Privilege {
  id: number;
  fee: number;
  payed: number;
  st: number;
  pl: number;
  dl: number;
  sp: number;
  cp: number;
  subp: number;
  cs: boolean;
  maxbr: number;
  fl: number;
  toast: boolean;
  flag: number;
  preSell: boolean;
  playMaxbr: number;
  downloadMaxbr: number;
  maxBrLevel: string;
  playMaxBrLevel: string;
  downloadMaxBrLevel: string;
  plLevel: string;
  dlLevel: string;
  flLevel: string;
  rscl?: any;
  freeTrialPrivilege: FreeTrialPrivilege;
  chargeInfoList: ChargeInfoList[];
}

interface ChargeInfoList {
  rate: number;
  chargeUrl?: any;
  chargeMessage?: any;
  chargeType: number;
}

interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  listenType?: any;
}

interface OriginSongSimpleDatum {
  songId: number;
  name: string;
  artists: Artist2[];
  albumMeta: Artist2;
}

interface Artist2 {
  id: number;
  name: string;
}

interface SqMusic {
  name?: any;
  id: number;
  size: number;
  extension: string;
  sr: number;
  dfsId: number;
  bitrate: number;
  playTime: number;
  volumeDelta: number;
}

interface Album {
  name: string;
  id: number;
  type: string;
  size: number;
  picId: number;
  blurPicUrl: string;
  companyId: number;
  pic: number;
  picUrl: string;
  publishTime: number;
  description: string;
  tags: string;
  company: string;
  briefDesc: string;
  artist: Artist;
  songs: any[];
  alias: string[];
  status: number;
  copyrightId: number;
  commentThreadId: string;
  artists: Artist[];
  subType: string;
  transName?: any;
  onSale: boolean;
  mark: number;
  gapless: number;
  picId_str: string;
}

interface Artist {
  name: string;
  id: number;
  picId: number;
  img1v1Id: number;
  briefDesc: string;
  picUrl: string;
  img1v1Url: string;
  albumSize: number;
  alias: any[];
  trans: string;
  musicSize: number;
  topicPerson: number;
}
export interface swipers {
	imageUrl: string;
	targetId: number;
	adid?: any;
	targetType: number;
	titleColor: string;
	typeTitle: string;
	url: string;
	exclusive: boolean;
	monitorImpress?: any;
	monitorClick?: any;
	monitorType?: any;
	monitorImpressList?: any;
	monitorClickList?: any;
	monitorBlackList?: any;
	extMonitor?: any;
	extMonitorInfo?: any;
	adSource?: any;
	adLocation?: any;
	adDispatchJson?: any;
	encodeId: string;
	program?: any;
	event?: any;
	video?: any;
	song?: any;
	scm: string;
}