import { createAction, props } from '@ngrx/store';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace BabyBabbleNamesActions {
  export const likeName = createAction('[@baby-babble names] like name', props<{ name: string }>());
  export const dislikeName = createAction('[@baby-babble names] dislike name', props<{ name: string }>());

  export const likeNameSuccess = createAction(
    '[@baby-babble names] like name success',
    props<{ name: string }>()
  );
  export const dislikeNameSuccess = createAction(
    '[@baby-babble names] dislike name success',
    props<{ name: string }>()
  );

  export const likeNameFailed = createAction(
    '[@baby-babble names] like name failed',
    props<{ error: unknown }>()
  );
  export const dislikeNameFailed = createAction(
    '[@baby-babble names] dislike name failed',
    props<{ error: unknown }>()
  );
}
