import { Headers } from '@angular/http';


const host = 'http://127.0.0.1:8000/';



export const baseUrl = host+'api/';

export var headers = new Headers({
  	'Accept': 'application/json',
  	'Content-Type': 'application/json'
  });

export const imageVideoUploadUrl = baseUrl+'interaction/video_image/upload/';
export const deafultProfilePicUrl = host + 'media/uploads/profile/default.jpg';
export const uploadProfilePicUrl = baseUrl + 'accounts/user-profile-pic-update/';
export const sharedUrl ='http://54.187.35.110/citizen';
export const cart_count =0;
export const defaultProfilePic =host+'media/default.png';
