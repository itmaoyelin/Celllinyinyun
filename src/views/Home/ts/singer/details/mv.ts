export interface Artist {
	img1v1Id: number;
	topicPerson: number;
	picUrl: string;
	img1v1Url: string;
	briefDesc: string;
	albumSize: number;
	trans: string;
	musicSize: number;
	alias: any[];
	name: string;
	id: number;
	picId: number;
	img1v1Id_str: string;
}

export interface mvs {
	id: number;
	name: string;
	status: number;
	artist: Artist;
	imgurl16v9: string;
	imgurl: string;
	artistName: string;
	duration: number;
	playCount: number;
	publishTime: string;
	subed: boolean;
}