import { PostsService } from '../services/posts.service.js';

// Post의 Controller 역할을 하는 class
export class PostsController {
    postsService = new PostsService(); // Post service를 class Controller 클래스의 멤버 변수로 할당

    /** 게시글 조회 API **/
    getPosts = async (req, res, next) => {
        try {
            // service 계층에 구현된 findAllPosts 로직을 수행
            const posts = await this.postsService.findAllPosts();

            return res.status(200).json({ data: posts });
        } catch (err) {
            next(err);
        }
    };

    /** 게시글 상세 조회 API **/
    getPostById = async (req, res, next) => {
        try {
            const { postId } = req.params;

            // service 계층에 구현된 findPostById 로직을 실행
            const post = await this.postsService.findPostById(postId);

            return res.status(200).json({ data: post });
        } catch (err) {
            next(err);
        }
    };

    /** 게시글 생성 API **/
    createPost = async (req, res, next) => {
        try {
            const { nickname, password, title, content } = req.body;

            // service 계층에 구현된 createPost 로직을 실행
            const createdPost = await this.postsService.createPost(nickname, password, title, content);

            return res.status(201).json({ data: createdPost });
        } catch (err) {
            next(err);
        }
    };

    /** 게시글 수정 API **/
    updatePost = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { password, title, content } = req.body;

            // service 계층에 구현된 updatePost 로직을 실행
            const updatedPost = await this.postsService.updatePost(postId, password, title, content);

            return res.status(200).json({ data: updatedPost });
        } catch (err) {
            next(err);
        }
    };

    /** 게시글 삭제 API **/
    deletePost = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { password } = req.body;

            // service 계층에 구현된 deletePost 로직을 실행
            const deletedPost = await this.postsService.deletePost(postId, password);

            return res.status(200).json({ data: deletedPost });
        } catch (err) {
            next(err);
        }
    };
}
