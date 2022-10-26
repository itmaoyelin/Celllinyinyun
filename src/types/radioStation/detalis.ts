export interface Artist {
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

export interface Artist {
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

export interface Artist {
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

export interface Album {
	name: string;
	id: number;
	type?: any;
	size: number;
	picId: number;
	blurPicUrl: string;
	companyId: number;
	pic: number;
	picUrl: string;
	publishTime: number;
	description: string;
	tags: string;
	company?: any;
	briefDesc: string;
	artist: Artist;
	songs: any[];
	alias: any[];
	status: number;
	copyrightId: number;
	commentThreadId: string;
	artists: Artist[];
	subType?: any;
	transName?: any;
	mark: number;
	picId_str: string;
}

export interface HMusic {
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

export interface LMusic {
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

export interface BMusic {
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

export interface MainSong {
	name: string;
	id: number;
	position: number;
	alias: any[];
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
	ringtone: string;
	crbt?: any;
	audition?: any;
	copyFrom: string;
	commentThreadId: string;
	rtUrl?: any;
	ftype: number;
	rtUrls: any[];
	copyright: number;
	transName?: any;
	sign?: any;
	mark: number;
	noCopyrightRcmd?: any;
	hMusic: HMusic;
	mMusic?: any;
	lMusic: LMusic;
	bMusic: BMusic;
	rtype: number;
	rurl?: any;
	mvid: number;
	mp3Url?: any;
}

export interface Dj {
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
	avatarImgIdStr: string;
	backgroundImgIdStr: string;
	anchor: boolean;
	avatarImgId_str: string;
	brand: string;
}

export interface Radio {
	dj?: any;
	category: string;
	secondCategory: string;
	buyed: boolean;
	price: number;
	originalPrice: number;
	discountPrice?: any;
	purchaseCount: number;
	lastProgramName?: any;
	videos?: any;
	finished: boolean;
	underShelf: boolean;
	liveInfo?: any;
	playCount: number;
	privacy: boolean;
	icon?: any;
	manualTagsDTO?: any;
	descPicList?: any;
	dynamic: boolean;
	intervenePicId: number;
	shortName?: any;
	categoryId: number;
	taskId: number;
	createTime: number;
	programCount: number;
	picId: number;
	subCount: number;
	lastProgramId: number;
	feeScope: number;
	lastProgramCreateTime: number;
	radioFeeType: number;
	intervenePicUrl: string;
	picUrl: string;
	desc: string;
	name: string;
	id: number;
	subed: boolean;
}

export interface Program {
	mainSong: MainSong;
	songs?: any;
	dj: Dj;
	blurCoverUrl: string;
	radio: Radio;
	duration: number;
	authDTO?: any;
	buyed: boolean;
	programDesc?: any;
	h5Links?: any;
	canReward: boolean;
	auditStatus: number;
	videoInfo?: any;
	score: number;
	liveInfo?: any;
	alg?: any;
	disPlayStatus?: any;
	auditDisPlayStatus: number;
	categoryName?: any;
	secondCategoryName?: any;
	existLyric: boolean;
	djPlayRecordVo?: any;
	recommended: boolean;
	icon?: any;
	isPublish: boolean;
	titbitImages?: any;
	trackCount: number;
	commentThreadId: string;
	channels: string[];
	categoryId: number;
	createTime: number;
	createEventId: number;
	listenerCount: number;
	scheduledPublishTime: number;
	serialNum: number;
	coverId: number;
	coverUrl: string;
	smallLanguageAuditStatus: number;
	bdAuditStatus: number;
	secondCategoryId: number;
	pubStatus: number;
	programFeeType: number;
	mainTrackId: number;
	titbits?: any;
	feeScope: number;
	reward: boolean;
	subscribedCount: number;
	privacy: boolean;
	description: string;
	name: string;
	id: number;
	shareCount: number;
	subscribed: boolean;
	likedCount: number;
	commentCount: number;
}

export interface resData {
	count: number;
	code: number;
	programs: Program[];
	more: boolean;
}