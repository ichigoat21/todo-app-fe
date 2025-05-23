interface ListProps {
     title : string,
     done? : boolean
}

export const List = (props : ListProps) => {
    return <div className="max-w-98 border-radius rounded-md">
      {props.title} 
    </div>
}