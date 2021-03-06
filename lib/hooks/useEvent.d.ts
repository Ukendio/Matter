interface ConnectionLike {
	Disconnect?(): void;
	Destroy?(): void;
	disconnect?(): void;
	destroy?(): void;
}

interface SignalLike {
	Connect?(cb: Callback): ConnectionLike;
	connect?(cb: Callback): ConnectionLike;
	on?(cb: Callback): ConnectionLike;
}

type InferSignalParameters<S> = S extends SignalLike
	? Parameters<
			Parameters<
				S["Connect"] extends Callback
					? S["Connect"]
					: S["connect"] extends Callback
					? S["connect"]
					: S["on"] extends Callback
					? S["on"]
					: never
			>[0]
	  >
	: never;

declare function useEvent<I extends Instance, E extends InstanceEventNames<I>>(
	instance: I,
	event: E,
): IterableFunction<LuaTuple<[index: number, ...rest: InferSignalParameters<InstanceEvents<I>[E]>]>>;

declare function useEvent<E extends SignalLike>(
	discriminator: unknown,
	event: E,
): IterableFunction<LuaTuple<[index: number, ...rest: InferSignalParameters<E>]>>;

export = useEvent;
