//用户全部回复评论

export interface Associator {
	vipCode: number;
	rights: boolean;
}

export interface VipRight {
	associator: Associator;
	musicPackage?: any;
	redVipAnnualCount: number;
	redVipLevel: number;
}

export interface User {
	locationInfo?: any;
	liveInfo?: any;
	anonym: number;
	commonIdentity?: any;
	userId: number;
	avatarUrl: string;
	avatarDetail?: any;
	userType: number;
	followed: boolean;
	mutual: boolean;
	remarkName?: any;
	vipRights?:  VipRight|any;
	nickname: string;
	authStatus: number;
	expertTags?: any;
	experts?: any;
	vipType: number;
}

export interface User {
	locationInfo?: any;
	liveInfo?: any;
	anonym: number;
	commonIdentity?: any;
	userId: number;
	avatarUrl: string;
	avatarDetail?: any;
	userType: number;
	followed: boolean;
	mutual: boolean;
	remarkName?: any;
	vipRights?: VipRight|any;
	nickname: string;
	authStatus: number;
	expertTags?: any;
	experts?: any;
	vipType: number;
}

export interface BeReplied {
	user: User;
	beRepliedCommentId: number;
	content: string;
	richContent?: any;
	status: number;
	expressionUrl?: any;
}

export interface Decoration {}

export interface parentComments {
	user: User;
	beReplied: BeReplied[];
	pendantData?: any;
	showFloorComment?: any;
	status: number;
	commentId: number;
	content: string;
	richContent?: any;
	contentResource?: any;
	time: number;
	timeStr: string;
	needDisplayTime: boolean;
	likedCount: number;
	expressionUrl?: any;
	commentLocationType: number;
	parentCommentId: number;
	decoration: Decoration;
	repliedMark?: any;
	grade?: any;
	liked: boolean;
}

