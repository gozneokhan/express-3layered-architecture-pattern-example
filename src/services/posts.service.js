import { PostsRepository } from '../repositories/posts.repository.js';

export class PostsService {
    postsRepository = new PostsRepository(); // 인스턴스화

    findAllPosts = async () => {
        // 저장소(Repository)에서 data를 요청 -> findAllPosts() 메서드를 호출함으로써 게시글 목록 정보 가져오기
        const posts = await this.postsRepository.findAllPosts();

        // 호출한 Post들을 게시글 생성 날짜로부터 내림차순으로 정렬(최신순)
        posts.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공
        // 위에서 findAllPost() 메서드를 실행했을 때, 안에 있는 password와 content도 함께 조회되기 때문에 password, content를 뺀 상태로, controller 에게 Response를 전달
        // map을 이용하여 여러가지 배열에 들어있는 값을 각각 객체화 시켜서 관리
        return posts.map((post) => {
            return {
                postId: post.postId,
                nickname: post.nickname,
                title: post.title,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
            };
        });
    };

    findPostById = async (postId) => {
        // 저장소(Repository)에 특정 게시글 하나를 요청
        const post = await this.postsRepository.findPostById(postId);

        return {
            postId: post.postId,
            nickname: post.nickname,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    };

    createPost = async (nickname, password, title, content) => {
        // 저장소(Repository)에 data를 요청
        const createdPost = await this.postsRepository.createPost(nickname, password, title, content);

        // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공
        // password가 빠진 상태로 client에게 전달(비즈니스 로직을 구성할 때, 중요한 정보를 외부로 노출시키지 않도록 해야함)
        return {
            postId: createdPost.postId,
            nickname: createdPost.nickname,
            title: createdPost.title,
            content: createdPost.content,
            createdAt: createdPost.createdAt,
            updatedAt: createdPost.updatedAt,
        };
    };

    updatePost = async (postId, password, title, content) => {
        // 저장소(Repository)에게 특정 게시물 하나를 요청
        const post = await this.postsRepository.findPostById(postId);

        if (!post) throw new Error('존재하지 않는 게시글입니다.');

        // 저장소(Repository)에게 data 수정을 요청
        await this.postsRepository.updatePost(postId, password, title, content);

        // 변경된 data를 조회
        const updatedPost = await this.postsRepository.findPostById(postId);

        return {
            postId: updatedPost.postId,
            nickname: updatedPost.nickname,
            title: updatedPost.title,
            content: updatedPost.content,
            createdAt: updatedPost.createdAt,
            updatedAt: updatedPost.updatedAt,
        };
    };

    deletePost = async (postId, password) => {
        // 저장소(Repository)에게 특정 게시글 하나를 요청
        const post = await this.postsRepository.findPostById(postId);

        if (!post) throw new Error('존재하지 않는 게시글입니다.');

        // 저장소(Repository)에게 data 삭제를 요청
        await this.postsRepository.deletePost(postId, password);

        return {
            nickname: post.postId,
            nickname: post.nickname,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    };
}
