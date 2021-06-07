import { createAction, props } from '@ngrx/store';
import { Choice } from '../firestore-models';

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

  export const loadLikedNames = createAction('[@baby-babble names] load liked names');
  export const loadLikedNamesSuccess = createAction(
    '[@baby-babble names] load liked names success',
    props<{ names: Choice[] }>()
  );
  export const loadLikedNamesFailed = createAction(
    '[@baby-babble names] load liked names failed',
    props<{ error: unknown }>()
  );

  export const updateNameStrength = createAction(
    '[@baby-babble names] update strength',
    props<{ choice: Choice }>()
  );

  export const updateNameStrengthSuccess = createAction(
    '[@baby-babble names] update strength success',
    props<{ choice: Choice }>()
  );
}
