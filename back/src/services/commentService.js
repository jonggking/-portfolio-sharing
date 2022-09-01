import { Comment } from '../db/models/Comment';

class commentService {
  //postNewComment: 새로운 댓글 입력 받으면 --> DB에 추가하는 용도
  static async postNewComment({ pageOwner, user_id, userName, comment }) {
    const newComment = { pageOwner, user_id, userName, comment };

    const createdComment = await Comment.create({ newComment });

    return createdComment;
  }
  //page_showAllComments: 한 사용자의 전체 정보(여러개) 가지고 올때
  static async page_showAllComments({ pageOwner }) {
    const pageAllComments = await Comment.findAll({ pageOwner });

    if (!pageAllComments) {
      const errorMessage = '내용이 없습니다.';
      return { errorMessage };
    }
    return pageAllComments;
  }
  //정보 수정할때: 사용자의 한가지댓글 수정하기 위해 고유값, toUpdate위한값
  static async commentUpdate({ user_id, toUpdate }) {
    let findOneComment = await Comment.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!findOneComment) {
      const errorMessage = '등록한 정보가 없습니다.';
      return { findOneComment };
    }

    if (toUpdate.comment) {
      const fieldToUpdate = 'comment';
      const newValue = toUpdate.comment;
      commentEdit = await Comment.update({ user_id, fieldToUpdate, newValue });
    }

    return commentEdit;
  }
}

export { commentService };
