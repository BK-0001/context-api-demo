import { ChangeEvent, FormEvent } from "react";

type Props = {
  title?: string;
  description?: string;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onTitleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function ArticleForm({
  title,
  description,
  onSubmit,
  onTitleChange,
  onDescriptionChange
}: Props) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          style={{ width: "100%" }}
          id="title"
          type="text"
          value={title}
          onChange={onTitleChange}
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <input
          style={{ width: "100%" }}
          id="description"
          type="text"
          value={description}
          onChange={onDescriptionChange}
        />
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
