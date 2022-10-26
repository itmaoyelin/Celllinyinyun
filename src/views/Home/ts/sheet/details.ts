export interface Subscriber {
	defaultAvatar: boolean;
	province: number;
	authStatus: number;
	followed: boolean;
	avatarUrl: string;
	accountStatus: number;
	gender: number;
	city: number;
	birthday: number;
	userId: number;
	userType: number;
	nickname: string;
	signature: string;
	description: string;
	detailDescription: string;
	avatarImgId: number;
	backgroundImgId: number;
	backgroundUrl: string;
	authority: number;
	mutual: boolean;
	expertTags?: any;
	experts?: any;
	djStatus: number;
	vipType: number;
	remarkName?: any;
	authenticationTypes: number;
	avatarDetail?: any;
	anchor: boolean;
	backgroundImgIdStr: string;
	avatarImgIdStr: string;
	avatarImgId_str: string;
}

export interface AvatarDetail {
	userType: number;
	identityLevel: number;
	identityIconUrl: string;
}

export interface Creator {
	defaultAvatar: boolean;
	province: number;
	authStatus: number;
	followed: boolean;
	avatarUrl: string;
	accountStatus: number;
	gender: number;
	city: number;
	birthday: number;
	userId: number;
	userType: number;
	nickname: string;
	signature: string;
	description: string;
	detailDescription: string;
	avatarImgId: number;
	backgroundImgId: number;
	backgroundUrl: string;
	authority: number;
	mutual: boolean;
	expertTags?: any;
	experts?: any;
	djStatus: number;
	vipType: number;
	remarkName?: any;
	authenticationTypes: number;
	avatarDetail: AvatarDetail;
	anchor: boolean;
	backgroundImgIdStr: string;
	avatarImgIdStr: string;
	avatarImgId_str: string;
}

export interface Ar {
	id: number;
	name: string;
	tns: any[];
	alias: any[];
}

export interface Al {
	id: number;
	name: string;
	picUrl: string;
	tns: any[];
	pic_str: string;
	pic: number;
}

export interface H {
	br: number;
	fid: number;
	size: number;
	vd: number;
}

export interface M {
	br: number;
	fid: number;
	size: number;
	vd: number;
}

export interface L {
	br: number;
	fid: number;
	size: number;
	vd: number;
}

export interface Sq {
	br: number;
	fid: number;
	size: number;
	vd: number;
}

export interface Hr {
	br: number;
	fid: number;
	size: number;
	vd: number;
}

export interface Track {
	image?:string;
	shareId?:number
	createTime?:number;
	listenerCount?:number;
	name: string;
	id: number;
	pst: number;
	t: number;
	ar: Ar[];
	alia?: any[];
	pop: number;
	st: number;
	rt: string;
	fee: number;
	v: number;
	crbt?: any;
	cf: string;
	al: Al;
	dt: number;
	h: H;
	m: M;
	l: L;
	sq: Sq;
	hr: Hr;
	a?: any;
	cd: string;
	no: number;
	rtUrl?: any;
	ftype: number;
	rtUrls: any[];
	djId: number;
	copyright: number;
	s_id: number;
	mark: number;
	originCoverType: number;
	originSongSimpleData?: any;
	tagPicList?: any;
	resourceState: boolean;
	version: number;
	songJumpInfo?: any;
	entertainmentTags?: any;
	single: number;
	noCopyrightRcmd?: any;
	rtype: number;
	rurl?: any;
	mv: number;
	mst: number;
	cp: number;
	publishTime: number;
}

export interface TrackId {
	id: number;
	v: number;
	t: number;
	at: number;
	alg?: any;
	uid: number;
	rcmdReason: string;
	sc?: any;
}

export interface RootObject {
	id: number;
	name: string;
	coverImgId: number;
	coverImgUrl: string;
	coverImgId_str: string;
	adType: number;
	userId: number;
	createTime: number;
	status: number;
	opRecommend: boolean;
	highQuality: boolean;
	newImported: boolean;
	updateTime: number;
	trackCount: number;
	specialType: number;
	privacy: number;
	trackUpdateTime: number;
	commentThreadId: string;
	playCount: number;
	trackNumberUpdateTime: number;
	subscribedCount: number;
	cloudTrackCount: number;
	ordered: boolean;
	description: string;
	tags: string[];
	updateFrequency?: any;
	backgroundCoverId: number;
	backgroundCoverUrl?: any;
	titleImage: number;
	titleImageUrl?: any;
	englishTitle?: any;
	officialPlaylistType?: any;
	subscribers: Subscriber[];
	subscribed: boolean;
	creator: Creator;
	tracks: Track[];
	videoIds?: any;
	videos?: any;
	trackIds: TrackId[];
	shareCount: number;
	commentCount: number;
	remixVideo?: any;
	sharedUsers?: any;
	historySharedUsers?: any;
	gradeStatus: string;
	score?: any;
	algTags: string[];
}
export interface Object{
    detailsName:string      //歌单名
    coverImgUrl:string      //歌单图片
    avatarUrl:string    //作者头像
      nickname:string         //作者姓名
    description:string      //简介
    time?:string            //更新时间
    subscribedCount:number  //收藏数量
    commentCount:number     //评论数量
    shareCount:number       //分享数量
}