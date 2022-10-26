export interface Artist {
	id: number;
	name: string;
	picUrl?: any;
	alias: any[];
	albumSize: number;
	picId: number;
	fansGroup?: any;
	img1v1Url: string;
	img1v1: number;
	trans?: any;
}

export interface Artist {
	id: number;
	name: string;
	picUrl?: any;
	alias: any[];
	albumSize: number;
	picId: number;
	fansGroup?: any;
	img1v1Url: string;
	img1v1: number;
	trans?: any;
}

export interface Album {
	id: number;
	name: string;
	artist: Artist;
	publishTime: number;
	size: number;
	copyrightId: number;
	status: number;
	picId: number;
	mark: number;
}

export interface songs {
	id: number;
	name: string;
	artists: Artist[];
	album: Album;
	duration: number;
	copyrightId: number;
	status: number;
	alias: any[];
	rtype: number;
	ftype: number;
	mvid: number;
	fee: number;
	rUrl?: any;
	mark: number;
}
